// src/pages/api/upload.ts

import connectMongo from '@/lib/mongo';
import { File as FormidableFile, IncomingForm } from 'formidable';
import fs from 'fs';
import mammoth from 'mammoth';
import type { NextApiRequest, NextApiResponse } from 'next';
import os from 'os';
import pdfParse from 'pdf-parse';
import JobModel from '../../../models/Job';

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Extract plain text from PDF or Word.
 */
async function extractText(file: FormidableFile): Promise<string> {
  const filePath = file.filepath;
  if (!filePath) throw new Error('Uploaded file path not found');

  const origName = file.originalFilename ?? '';
  const ext = origName.split('.').pop()?.toLowerCase() ?? '';
  const mime = file.mimetype ?? '';

  // PDF
  if (mime.includes('pdf') || ext === 'pdf') {
    const buffer = fs.readFileSync(filePath);
    return (await pdfParse(buffer)).text;
  }

  // Word
  if (mime.includes('word') || ext === 'doc' || ext === 'docx') {
    return (await mammoth.extractRawText({ path: filePath })).value;
  }

  // Fallback: try PDF → then Word
  try {
    const buffer = fs.readFileSync(filePath);
    return (await pdfParse(buffer)).text;
  } catch {
    return (await mammoth.extractRawText({ path: filePath })).value;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 1) Parse the multipart form
  let files: Record<string, FormidableFile | FormidableFile[]>;
  try {
    const form = new IncomingForm({
      uploadDir: os.tmpdir(),
      keepExtensions: true,
    });
    const parsed = await new Promise<{
      fields: unknown;
      files: Record<string, FormidableFile | FormidableFile[]>;
    }>((resolve, reject) =>
      form.parse(req, (err, fields, files) =>
        err ? reject(err) : resolve({ fields, files })
      )
    );
    files = parsed.files;
  } catch (err) {
    console.error('Form parsing error:', err);
    return res.status(500).json({ error: 'Error parsing upload' });
  }

  // 2) Get the uploaded file
  const uploaded = files.file;
  if (!uploaded) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;

  // 3) Extract text from resume
  let text: string;
  try {
    text = await extractText(file);
  } catch (err: any) {
    console.error('Resume parsing error:', err);
    const status = err.message.includes('not found') ? 400 : 500;
    return res.status(status).json({ error: err.message });
  }

  // 4) Build keyword list
  const resumeWords = Array.from(
    new Set(
      text
        .toLowerCase()
        .split(/\W+/)
        .filter((w) => w.length > 3)
    )
  );

  // 5) Fetch jobs & compute match scores (title‐only)
  try {
    await connectMongo();
    const jobs = await JobModel.find();

    const matches = jobs
      .map((job) => {
        const jobText = job.title.toLowerCase();
        const hits = resumeWords.filter((w) =>
          jobText.includes(w)
        ).length;
        const score = resumeWords.length
          ? Math.round((hits / resumeWords.length) * 100)
          : 0;
        return {
          title: job.title,
          company: job.company,
          link: job.link,
          matchScore: score,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10);

    return res.status(200).json({ matches });
  } catch (dbErr) {
    console.error('Matching error:', dbErr);
    return res.status(500).json({ error: 'Failed to match jobs' });
  }
}
