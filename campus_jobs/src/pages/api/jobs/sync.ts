// src/pages/api/jobs/sync.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/lib/mongo';
import { scrapeUGAJobs } from '@/lib/scraper';
import JobModel from '../../../../models/Job';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const scrapedJobs = await scrapeUGAJobs();
    await connectMongo(); // Connect to MongoDB via Mongoose

    await JobModel.deleteMany({}); // Clear old jobs
    await JobModel.insertMany(scrapedJobs); // Save new jobs

    res.status(200).json({ message: 'Jobs synced', count: scrapedJobs.length });
  } catch (err) {
    console.error('Error syncing jobs:', err);
    res.status(500).json({ message: 'Error syncing jobs' });
  }
}
