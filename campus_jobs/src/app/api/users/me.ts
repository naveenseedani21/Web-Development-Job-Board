import connectMongo from '@/lib/mongo';
import User from '../../../../models/User';
import { getUserFromToken } from '../../lib/auth';

export async function GET(req: Request) {
  await connectMongo();
  const user = await getUserFromToken(req);
  if (!user) return new Response('Unauthorized', { status: 401 });

  const dbUser = await User.findById(user.userId).select('savedJobs');
  return new Response(JSON.stringify({ savedJobs: dbUser?.savedJobs || [] }));
}