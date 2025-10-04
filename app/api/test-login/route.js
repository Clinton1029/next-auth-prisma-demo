import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Fake success response — you can replace this later with real DB logic
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: Date.now(),
        email,
        name: email.split("@")[0], // derive name from email just for demo
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error logging in", error: error.message },
      { status: 500 }
    );
  }
}
