// src/pages/api/upload.ts
import dotenv from 'dotenv';
import connectMongo from '@/lib/mongo';
import { File as FormidableFile, IncomingForm } from 'formidable';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import os from 'os';
import JobModel from '../../../models/Job';
import { fetch } from 'undici';
dotenv.config();

console.log("✅ ENV VALUE:", process.env.RESUME_PARSER_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Parse resume using Resume Parser API (titles + skills)
 */
async function extractTitleAndSkills(file: FormidableFile): Promise<{ titles: string[]; skills: string[] }> {
  const filePath = file.filepath;
  const apiKey = process.env.RESUME_PARSER_KEY;
  console.log("API KEY?", process.env.RESUME_PARSER_KEY);
  if (!apiKey) throw new Error("Missing Resume Parser API key");
  if (!filePath) throw new Error('Missing Resume Parser API key');

  const resumeStream = fs.createReadStream(filePath);
  const headers: HeadersInit = {
    'Content-Type': 'application/octet-stream',
    'apikey': apiKey,
  };

  const response = await fetch('https://api.apilayer.com/resume_parser/upload', {
    method: 'POST',
    headers,
    body: resumeStream,
    duplex: 'half', 
  }); 

  const raw = await response.text();
  console.log('Resume Parser API response:', raw);

  if (!response.ok) {
    throw new Error(`Resume Parser API error: ${response.status} - ${raw}`);
  }

  const data = JSON.parse(raw);
  const skills: string[] = data.skills || [];
  const titles: string[] = (data.experience || [])
    .map((exp: any) => exp.title)
    .filter((title: any) => typeof title === 'string' && title.trim().length > 0);

  return { titles, skills };

  // const origName = file.originalFilename ?? '';
  // const ext = origName.split('.').pop()?.toLowerCase() ?? '';
  // const mime = file.mimetype ?? '';

  // // PDF
  // if (mime.includes('pdf') || ext === 'pdf') {
  //   const buffer = fs.readFileSync(filePath);
  //   return (await pdfParse(buffer)).text;
  // }

  // // Word
  // if (mime.includes('word') || ext === 'doc' || ext === 'docx') {
  //   return (await mammoth.extractRawText({ path: filePath })).value;
  // }

  // // Fallback: try PDF → then Word
  // try {
  //   const buffer = fs.readFileSync(filePath);
  //   return (await pdfParse(buffer)).text;
  // } catch {
  //   return (await mammoth.extractRawText({ path: filePath })).value;
  // }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 1. Parse form & file
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
      form.parse(req, (err: any, fields: any, files: any) =>
        err ? reject(err) : resolve({ fields, files })
      )
    );
    files = parsed.files;
  } catch (err) {
    console.error('Form parsing error:', err);
    return res.status(500).json({ error: 'Error parsing upload' });
  }

  const uploaded = files.file;
  if (!uploaded) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;

  if (file.size > 2 * 1024 * 1024) {
    return res.status(400).json({ error: 'File too large (max 2MB)' });
  }

  // 2. Extract experience titles and skills
  let titles: string[] = [];
  let skills: string[] = [];
  try {
    const parsed = await extractTitleAndSkills(file);
    titles = parsed.titles;
    skills = parsed.skills;
  } catch (err: any) { 
    console.error('Resume parsing error:', err);
    const status = err.message.includes('not found') ? 400 : 500;
    return res.status(status).json({ error: err.message });
  }

  // 3. Match against job database
  try {
    await connectMongo();
    const jobs = await JobModel.find();

    const matches = jobs
      .map((job) => {
        const jobTitle = (job.title || '').toLowerCase();
        const jobDesc = (job.description || '').toLowerCase();

        const titleMatches = titles.filter((t) => jobTitle.includes(t.toLowerCase())).length;
        const skillMatches = skills.filter((s) => jobDesc.includes(s.toLowerCase())).length;

        const totalMatches = titleMatches * 2 + skillMatches;
        const maxPossible = (titles.length * 2 + skills.length) || 1;
        
        const score = Math.round((totalMatches / maxPossible) * 100);

        return {
          title: job.title,
          company: job.company,
          link: job.link,
          description: job.description,
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
