import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { client } from '@/sanity/lib/client';



export async function POST(req:any) {
  try {
    const body = await req.json(); // Parse the request body
    const { email, password } = body;

    // Find the user in Sanity
    const user = await client.fetch(`*[_type == "user" && email == $email][0]`, { email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: '1h' }
    );

    return NextResponse.json(
      { success: true, message: 'Login successful', token, user },
      { status: 200 }
    );
  } catch (error:any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
