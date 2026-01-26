import connectDb from "@/app/lib/db";
import Order from "@/app/models/order.model";
import {User} from "@/app/models/user.model";

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { userId, items, totalAmount, paymentMethod, address } =
      await req.json();
    if (!userId || !items ||  !totalAmount || !paymentMethod || !address) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 },
      );
    }
    if (paymentMethod !== "cod") {
      return new Response(
        JSON.stringify({
          message: "Only Cash on Delivery is supported currently",
        }),
        { status: 400 },
      );
    }
    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 400,
      });
    }
    const newOrder = await Order.create({
      user: userId,
      items,
      paymentMethod,
      totalAmount,
      address,
    });
    return new Response(
      JSON.stringify({ message: "Order placed successfully", order: newOrder }),
      { status: 201 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error in creating new order",
        error,
      }),
      { status: 500 },
    );
  }
}
