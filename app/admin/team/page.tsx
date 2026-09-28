"use client"

import * as React from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type EditableMember = {
  slug: string
  name: string
  about: string
  experience: string[]
  expertise: string[]
  services: string[]
  deliveredProjects: string[]
}

const fields = ["experience", "expertise", "services", "deliveredProjects"] as const

export default function AdminTeamPage() {
  const [key, setKey] = React.useState("")
  const [members, setMembers] = React.useState<EditableMember[]>([])
  const [selected, setSelected] = React.useState("")
  const [status, setStatus] = React.useState("")

  async function loadMembers() {
    try {
      const response = await fetch("/api/admin/team", {
        headers: { "x-admin-key": key.trim() },
      })
      if (!response.ok) throw new Error("Invalid admin key.")
      const result = (await response.json()) as EditableMember[]
      setMembers(result)
      setSelected(result[0]?.slug || "")
      setStatus("Loaded")
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to load profiles.")
    }
  }

  async function saveMember() {
    const member = members.find((item) => item.slug === selected)
    if (!member) return
    setStatus("Saving...")
    const response = await fetch("/api/admin/team", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-key": key.trim() },
      body: JSON.stringify({ slug: member.slug, update: member }),
    })
    setStatus(response.ok ? "Saved successfully" : "Save failed")
  }

  const member = members.find((item) => item.slug === selected)
  function updateMember(changes: Partial<EditableMember>) {
    setMembers((current) => current.map((item) => (item.slug === selected ? { ...item, ...changes } : item)))
  }

  return (
    <main className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-neon-cyan">Devine Tech Admin</p>
        <h1 className="mt-2 text-3xl font-bold">Team profile control panel</h1>
        <p className="mt-2 text-muted-foreground">Update services and delivered projects shown on each public profile.</p>

        <div className="mt-8 flex gap-3">
          <Input type="password" placeholder="Admin panel key" value={key} onChange={(event) => setKey(event.target.value)} />
          <Button onClick={() => void loadMembers()}>Load profiles</Button>
        </div>

        {members.length > 0 && member && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">
            <div className="flex flex-col gap-2">
              {members.map((item) => (
                <Button key={item.slug} variant={item.slug === selected ? "secondary" : "ghost"} onClick={() => setSelected(item.slug)}>
                  {item.name}
                </Button>
              ))}
            </div>
            <div className="space-y-5 rounded-2xl border border-border bg-card/60 p-6">
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <Textarea value={member.about} onChange={(event) => updateMember({ about: event.target.value })} rows={5} placeholder="About this team member" />
              {fields.map((field) => (
                <Textarea
                  key={field}
                  value={member[field].join("\n")}
                  onChange={(event) => updateMember({ [field]: event.target.value.split("\n").filter(Boolean) })}
                  rows={4}
                  placeholder={`${field} (one item per line)`}
                />
              ))}
              <Button onClick={() => void saveMember()}><Save className="size-4" /> Save changes</Button>
            </div>
          </div>
        )}
        {status && <p className="mt-4 text-sm text-muted-foreground">{status}</p>}
      </div>
    </main>
  )
}
