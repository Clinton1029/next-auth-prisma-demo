import jwt from "jsonwebtoken";

export function verifyToken(token) {
  try {
    if (!token) return null;

    // Verify token using the same secret used by NextAuth or your JWT
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);

    return decoded; // returns { id, email, iat, exp, ... }
  } catch (err) {
    console.error("❌ Invalid or expired token:", err.message);
    return null;
  }
}
