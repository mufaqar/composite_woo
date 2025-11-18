import { NextResponse } from "next/server";

export async function GET() {
  try {
    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" });
  }
}
