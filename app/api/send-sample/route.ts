import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData, selectedSamples } = body;

    // ======================
    // 1️⃣ SEND EMAIL
    // ======================
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const samplesList = selectedSamples
      .map((sample: any, i: number) => `${i + 1}. ${sample.name}`)
      .join("\n");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "🧾 New Sample Request",
      text: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}, ${formData.city}, ${formData.country}, ${formData.postcode}
Project Start Date: ${formData.startdate}

Selected Samples:
${samplesList || "No samples selected"}

Fitters Quote: ${formData.filters ? "Yes" : "No"}
Terms Accepted: ${formData.terms ? "Yes" : "No"}
      `,
    });

    // ======================
    // 2️⃣ INSERT INTO WORDPRESS
    // ======================
    await fetch(
      `${process.env.WP_URL}/wp-json/custom/v1/sample-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.WC_CONSUMER_SECRET || "", // optional
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}, ${formData.country}, ${formData.postcode}`,
          startdate: formData.startdate,
          filters: formData.filters,
          terms: formData.terms,
          samples: samplesList,
        }),
      }
    );

    return NextResponse.json({
      success: true,
      message: "Email sent & data saved successfully!",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
