import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const wpResponse = await fetch(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/jwt-auth/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await wpResponse.json();

    if (!wpResponse.ok) {
      return NextResponse.json({ error: data.message || "Invalid credentials" }, { status: 401 });
    }

    // You can store token in cookie for session persistence
    return NextResponse.json({ token: data.token, user: data.user_display_name });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
