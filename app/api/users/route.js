import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ Check for duplicates
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // ✅ Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password, // (we’ll hash this later)
      },
    });

    return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("❌ Prisma Registration Error:", error);
    return NextResponse.json(
      { message: "Error registering user" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
