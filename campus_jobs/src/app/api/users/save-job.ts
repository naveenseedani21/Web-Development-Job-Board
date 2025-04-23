import connectMongo from '@/lib/mongo';
import User from '../../../../models/User';
import { getUserFromToken } from '../../lib/auth'; // Create this helper if needed
import Job from '../../../../models/User';

export async function POST(req: Request) {
  await connectMongo();
  const user = await getUserFromToken(req);
  if (!user) return new Response('Unauthorized', { status: 401 });

  const { jobId } = await req.json();
  if (!jobId) return new Response('Missing jobId', { status: 400 });

  await User.findByIdAndUpdate(user.userId, {
    $addToSet: { savedJobs: jobId }
  });

  return new Response(JSON.stringify({ success: true }));
}

export async function DELETE(req: Request) {
  await connectMongo();
  const user = await getUserFromToken(req);
  if (!user) return new Response('Unauthorized', { status: 401 });

  const { jobId } = await req.json();
  if (!jobId) return new Response('Missing jobId', { status: 400 });

  await User.findByIdAndUpdate(user.userId, {
    $pull: { savedJobs: jobId }
  });

  return new Response(JSON.stringify({ success: true }));
}
