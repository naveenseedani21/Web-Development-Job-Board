// app/api/signup/route.ts

import bcrypt from 'bcryptjs';
import User from '../../../../models/User';
import connectMongoDB from '../../../lib/mongo';

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  await connectMongoDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return new Response("User already exists", { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ username, email, password: hashed });

  return new Response("User created", { status: 201 });
}
