import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData, selectedSamples } = body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format selected samples
    const samplesList = selectedSamples
      .map((sample: any, i: number) => `${i + 1}. ${sample.name}`)
      .join("\n");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "🧾 New Sample Request",
      text: `
A new sample request has been submitted:

🧍 Name: ${formData.name}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone}
🏠 Address: ${formData.address}, ${formData.city}, ${formData.country}, ${
        formData.postcode
      }
📅 Project Start Date: ${formData.startdate}

Selected Samples:
${samplesList || "No samples selected"}

Fitters Quote: ${formData.filters ? "Yes" : "No"}
Terms Accepted: ${formData.terms ? "Yes" : "No"}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error: any) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email." },
      { status: 500 }
    );
  }
}
