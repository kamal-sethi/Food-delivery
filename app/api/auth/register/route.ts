// import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/app/lib/db";
import {User} from "@/app/models/user.model";
import bcrypt from "bcryptjs";
export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      return NextResponse.json(user, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: `register error ${error}` },
      { status: 500 }
    );
  }
}
