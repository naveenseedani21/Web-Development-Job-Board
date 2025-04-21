import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/lib/mongo';
import Job from '../../../../models/Job';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    await connectMongo();
    const { title, company, image, link} = req.body;

    const newJob = await Job.create({
      title,
      company,
      image: image || '/default-image.jpg',
      link: '#',
    });

    res.status(201).json({ message: 'Job Added', job: newJob });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create job', details: error });
  }
}
