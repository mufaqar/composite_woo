import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    const wpResponse = await fetch(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await wpResponse.json();

    if (!wpResponse.ok) {
      return NextResponse.json({ error: data.message || "Registration failed" }, { status: 400 });
    }

    return NextResponse.json({ message: "User registered successfully", user: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
