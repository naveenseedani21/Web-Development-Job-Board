import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/lib/mongo';
import JobModel from '../../../../models/Job';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo();
    const jobs = await JobModel.find().sort({ postedDate: -1 });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}
