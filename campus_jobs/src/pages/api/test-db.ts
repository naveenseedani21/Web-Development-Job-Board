import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/lib/mongo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo();
    res.status(200).json({ message: 'Connected to MongoDB!' });
  } catch (error) {
    res.status(500).json({ message: 'MongoDB connection failed', error });
  }
}
