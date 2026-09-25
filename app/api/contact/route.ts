import { NextResponse } from "next/server";

// In-memory rate limiting map: ip -> last submission timestamp
const rateLimitMap = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const now = Date.now();
    const lastRequest = rateLimitMap.get(ip);

    // Rate limit: 1 request every 15 seconds per IP
    if (lastRequest && now - lastRequest < 15000) {
      return NextResponse.json(
        { error: "Vui lòng đợi 15 giây trước khi gửi lại tin nhắn tiếp theo." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Vui lòng nhập họ tên hợp lệ (tối thiểu 2 ký tự)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Vui lòng nhập địa chỉ email hợp lệ." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Nội dung tin nhắn quá ngắn. Vui lòng nhập tối thiểu 5 ký tự." },
        { status: 400 }
      );
    }

    rateLimitMap.set(ip, now);

    // Optional: Resend API integration if environment variable is present
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: "vangminhphuc209@gmail.com",
          subject: `[Portfolio Contact] Tin nhắn từ ${name.trim()}`,
          reply_to: email.trim(),
          text: `Tên: ${name.trim()}\nEmail: ${email.trim()}\n\nNội dung:\n${message.trim()}`,
        }),
      });

      if (!res.ok) {
        console.error("Resend API response:", await res.text());
      }
    } else {
      // In development or when key is not set, log safely
      console.log("📨 [Portfolio Contact Submitted]:", {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Cảm ơn bạn! Tin nhắn đã được gửi thành công đến Vàng Minh Phúc.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
