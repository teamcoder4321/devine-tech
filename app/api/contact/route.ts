import { NextResponse } from "next/server"

type ContactPayload = {
  name?: unknown
  email?: unknown
  message?: unknown
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const recipient = process.env.CONTACT_EMAIL

  if (!apiKey || !recipient) {
    return NextResponse.json(
      { error: "Contact email is not configured yet. Please try again later." },
      { status: 503 }
    )
  }

  const payload = (await request.json().catch(() => null)) as ContactPayload | null
  const name = typeof payload?.name === "string" ? payload.name.trim() : ""
  const email = typeof payload?.email === "string" ? payload.email.trim() : ""
  const message = typeof payload?.message === "string" ? payload.message.trim() : ""

  if (!name || !email || !message || message.length < 10 || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide valid contact details." }, { status: 400 })
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Devine Tech Website <onboarding@resend.dev>",
      to: [recipient],
      reply_to: email,
      subject: `New project inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`,
    }),
  })

  if (!resendResponse.ok) {
    return NextResponse.json(
      { error: "We could not deliver your message. Please try again." },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
