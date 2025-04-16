import { NextRequest, NextResponse } from 'next/server';
import * as mammoth from 'mammoth';
import { jobListings } from '../../lib/jobs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';


// ✅ Disable the worker to avoid import issues on server
pdfjsLib.GlobalWorkerOptions.workerSrc = undefined;

export const dynamic = 'force-dynamic';

// ✅ PDF text extraction logic
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
  const pdf = await loadingTask.promise;

  let text = '';

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(' ');
    text += pageText + '\n';
  }

  return text;
}

export async function POST(req: NextRequest) {
  console.log('[UPLOAD] API route hit');

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.warn('[UPLOAD] No file found in form data');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    console.log(`[UPLOAD] Received file: ${file.name}`);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extension = file.name.split('.').pop()?.toLowerCase();
    console.log(`[UPLOAD] File extension: ${extension}`);

    let text = '';

    if (extension === 'pdf') {
      console.log('[UPLOAD] Extracting PDF with pdfjs-dist...');
      text = await extractTextFromPDF(buffer);
    } else if (extension === 'docx') {
      console.log('[UPLOAD] Parsing DOCX...');
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 415 });
    }

    console.log('[UPLOAD] Resume parsed. Matching jobs...');

    const matches = jobListings
      .map((job) => {
        let score = 0;
        for (const skill of job.skills) {
          const regex = new RegExp(`\\b${skill}\\b`, 'i');
          if (regex.test(text)) score += 1;
        }
        const matchScore = Math.round((score / job.skills.length) * 100);
        return { ...job, matchScore };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);

    console.log('[UPLOAD] Top matches:', matches);
    return NextResponse.json({ matches });
  } catch (err) {
    console.error('[UPLOAD] Fatal error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
