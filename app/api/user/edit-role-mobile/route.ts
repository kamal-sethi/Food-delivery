export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { auth } from "@/app/auth";
import connectDb from "@/app/lib/db";
import {User} from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { role, mobile } = await req.json();
    console.log(role);
    const session = await auth();

    const user = await User.findOneAndUpdate(
      { email: session?.user?.email },
      {
        role,
        mobile,
      },
      { new: true }
    );
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error updating user role: ${error}` },
      { status: 500 }
    );
  }
}
