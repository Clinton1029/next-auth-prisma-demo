import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "users.json");

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Check if file exists — if not, return error
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: "No users found. Please register first." },
        { status: 404 }
      );
    }

    // Read existing users
    const fileData = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(fileData || "[]");

    // Find a match
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // ✅ Successful login
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    return NextResponse.json({ message: "Error logging in" }, { status: 500 });
  }
}
