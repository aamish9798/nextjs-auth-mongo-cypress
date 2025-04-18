import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const { firstName, lastName, email, password, gender } = body;

  if (!firstName || !lastName || !email || !password || !gender) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    // Log the request data to check for errors in the input
    console.log("Request data:", body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      gender,
      password,
    });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (err) {
    console.error("API error:", err); // Log the full error for better insights
    return NextResponse.json(
      { message: "Server error", error: err },
      { status: 500 }
    );
  }
}
