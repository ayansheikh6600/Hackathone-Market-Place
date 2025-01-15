import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { client } from '@/sanity/lib/client';


export async function POST(req:any) {
  try {
    const body = await req.json(); // Parse the request body
    const { firstName,lastName, email, password } = body;

    // Check if the user already exists
    const existingUser = await client.fetch(`*[_type == "user" && email == $email][0]`, { email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document in Sanity
    const newUser = await client.create({
      _type: 'user',
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { success: true, message: 'User created successfully', user: newUser },
      { status: 201 }
    );
  } catch (error:any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}