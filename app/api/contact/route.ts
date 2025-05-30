import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, budget, timeline, projectType } = await request.json()

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Enhanced email to you
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact: ${subject} - ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px;">
          <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <h1 style="color: #8B5CF6; margin: 0 0 20px 0; font-size: 28px; font-weight: bold;">New Contact Form Submission</h1>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8B5CF6;">
              <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 20px;">Contact Details</h2>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #8B5CF6; text-decoration: none;">${email}</a></p>
              <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
            </div>

            ${
              projectType || budget || timeline
                ? `
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #06b6d4;">
              <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 20px;">Project Details</h2>
              ${projectType ? `<p style="margin: 8px 0;"><strong>Project Type:</strong> ${projectType}</p>` : ""}
              ${budget ? `<p style="margin: 8px 0;"><strong>Budget:</strong> ${budget}</p>` : ""}
              ${timeline ? `<p style="margin: 8px 0;"><strong>Timeline:</strong> ${timeline}</p>` : ""}
            </div>
            `
                : ""
            }

            <div style="background: #fefce8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #eab308;">
              <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 20px;">Message</h2>
              <div style="background: white; padding: 15px; border-radius: 4px; line-height: 1.6; color: #374151;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}" style="background: linear-gradient(135deg, #8B5CF6, #06b6d4); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reply to ${name}</a>
            </div>

            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            <p style="color: #64748b; font-size: 14px; text-align: center; margin: 0;">
              This message was sent from your portfolio contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    })

    // Enhanced auto-reply to sender
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: `Thank you for reaching out, ${name}! 🚀`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px;">
          <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <h1 style="color: #8B5CF6; margin: 0 0 20px 0; font-size: 28px; font-weight: bold;">Thank you for reaching out! 🎉</h1>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">Hi ${name},</p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Thank you for your interest in working together! I've received your message about "<strong>${subject}</strong>" and I'm excited to learn more about your project.
            </p>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8B5CF6;">
              <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">What happens next?</h2>
              <ul style="margin: 0; padding-left: 20px; color: #374151;">
                <li style="margin: 8px 0;">I'll review your message within 24 hours</li>
                <li style="margin: 8px 0;">I'll send you a detailed response with next steps</li>
                <li style="margin: 8px 0;">We can schedule a free consultation call if needed</li>
              </ul>
            </div>

            <div style="background: #fefce8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #eab308;">
              <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">Your Message Summary</h2>
              ${projectType ? `<p style="margin: 8px 0;"><strong>Project Type:</strong> ${projectType}</p>` : ""}
              ${budget ? `<p style="margin: 8px 0;"><strong>Budget:</strong> ${budget}</p>` : ""}
              ${timeline ? `<p style="margin: 8px 0;"><strong>Timeline:</strong> ${timeline}</p>` : ""}
              <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px; color: #374151;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #374151; margin: 0 0 15px 0;">In the meantime, feel free to check out:</p>
              <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <a href="https://github.com/akbarkhoja" style="background: #1f2937; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px;">My GitHub</a>
                <a href="https://linkedin.com/in/akbarkhoja" style="background: #0077b5; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px;">LinkedIn</a>
                <a href="#" style="background: #8B5CF6; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px;">Portfolio</a>
              </div>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Best regards,<br>
              <strong>Akbar Khoja</strong><br>
              <span style="color: #8B5CF6;">Full Stack Developer</span>
            </p>

            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            <p style="color: #64748b; font-size: 14px; text-align: center; margin: 0;">
              This is an automated response. Please don't reply to this email directly.<br>
              If you have urgent questions, feel free to call me at +998 (93) 075-70-18
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({
      message: "Email sent successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Email error:", error)
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
