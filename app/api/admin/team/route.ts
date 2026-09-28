import { NextResponse } from "next/server"
import { team } from "@/lib/site-data"
import { readTeamUpdates, writeTeamUpdates, type TeamUpdate } from "@/lib/team-updates"

function authorized(request: Request) {
  const configuredKey = process.env.ADMIN_PANEL_KEY?.trim().replace(/^@/, "")
  const submittedKey = request.headers.get("x-admin-key")?.trim().replace(/^@/, "")

  return Boolean(configuredKey) && submittedKey === configuredKey
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const updates = await readTeamUpdates()
  return NextResponse.json(team.map((member) => ({ ...member, ...updates[member.slug] })))
}

export async function PUT(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = (await request.json().catch(() => null)) as { slug?: string; update?: TeamUpdate } | null
  const member = team.find((item) => item.slug === body?.slug)
  if (!member || !body?.update) {
    return NextResponse.json({ error: "Invalid team update." }, { status: 400 })
  }

  const updates = await readTeamUpdates()
  updates[member.slug] = body.update
  await writeTeamUpdates(updates)
  return NextResponse.json({ ...member, ...body.update })
}
