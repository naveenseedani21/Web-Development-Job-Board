// pages/api/jobs/delete.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import connectMongo from '@/lib/mongo';
import Job from '../../../../models/Job';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).end();

  const session = await getSession(req, res);

  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await connectMongo();
    const { id } = req.query;

    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted', job: deletedJob });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete job', details: error });
  }
}
