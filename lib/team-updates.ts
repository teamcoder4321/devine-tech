import { promises as fs } from "node:fs"
import path from "node:path"
import type { TeamMember } from "@/lib/site-data"

export type TeamUpdate = Pick<
  TeamMember,
  "about" | "experience" | "expertise" | "services" | "deliveredProjects"
>

const updatesPath = path.join(process.cwd(), "data", "team-updates.json")

export async function readTeamUpdates(): Promise<Record<string, TeamUpdate>> {
  try {
    return JSON.parse(await fs.readFile(updatesPath, "utf8")) as Record<string, TeamUpdate>
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return {}
    throw error
  }
}

export async function writeTeamUpdates(updates: Record<string, TeamUpdate>) {
  await fs.mkdir(path.dirname(updatesPath), { recursive: true })
  await fs.writeFile(updatesPath, JSON.stringify(updates, null, 2) + "\n", "utf8")
}
