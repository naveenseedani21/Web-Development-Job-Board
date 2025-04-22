import bcrypt from 'bcryptjs';
import User from '../../../../models/User';
import connectMongo from '../../../lib/mongo';

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  await connectMongo();

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return new Response("User already exists", { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashed });

    return new Response("User created", { status: 201 });
  } catch (err: any) {
    if (err.code === 11000) {
      return new Response("Username or email already exists", { status: 409 });
    }

    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
