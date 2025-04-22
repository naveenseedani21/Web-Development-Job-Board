import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../../models/User';
import connectMongo from '../../../lib/mongo';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await connectMongo();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response("Invalid credentials", { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response("Invalid credentials", { status: 401 });
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: {
      'Set-Cookie': `token=${token}; Path=/; HttpOnly; Max-Age=3600; SameSite=Strict`
    }
  });
}
