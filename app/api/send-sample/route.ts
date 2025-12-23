import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData, selectedSamples, token } = body;

    const samplesList = selectedSamples
      .map((s: any, i: number) => `${i + 1}. ${s.name}`)
      .join("\n");

    const wpRes = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/sample_requests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: `Sample Request – ${formData.name}`,
          status: "publish",
          content: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Address:
${formData.address}, ${formData.city}, ${formData.country}, ${formData.postcode}

Start Date: ${formData.startdate}

Samples:
${samplesList || "None"}

Fitters Quote: ${formData.filters ? "Yes" : "No"}
Terms Accepted: ${formData.terms ? "Yes" : "No"}
          `,
          meta: {
            email: formData.email,
            phone: formData.phone,
          },
        }),
      }
    );

    if (!wpRes.ok) {
      const err = await wpRes.json();
      throw new Error(err.message || "WP insert failed");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
