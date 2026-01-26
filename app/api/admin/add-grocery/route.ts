export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { auth } from "@/app/auth";
import {uploadOnCloudinary} from "@/app/lib/cloudinary";
import connectDb from "@/app/lib/db";
import {Grocery} from "@/app/models/grocery.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const sessionData = await auth();
    if (sessionData?.user?.role !== "admin") {
      return NextResponse.json(
        { message: "You are not admin" },
        { status: 400 }
      );
    }
    const formData = await req.formData();

    const name = formData.get("name");
    const category = formData.get("category") as string;
    const price = formData.get("price") as string;
    const unit = formData.get("unit") as string;
    const file = formData.get("image") as Blob | null;
    // console.log(file);

    let imageUrl;
    if (file) {
      imageUrl = await uploadOnCloudinary(file);
      // console.log(imageUrl);
    }
    //  console.log("hello");
    const grocery = await Grocery.create({
      name,
      category,
      price,
      unit,
      image: imageUrl,
    });
    // console.log("hello");

    // console.log(grocery);
    return NextResponse.json(grocery, { status: 201 });
  } catch (error) {
    console.error("Add grocery error:", error);
    return NextResponse.json(
      { message: "Error in adding grocery" },
      { status: 400 }
    );
  }
}
