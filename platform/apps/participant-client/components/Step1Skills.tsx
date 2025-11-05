"use client"

import { CommandEmpty } from "@/components/ui/command"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandList, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { ChevronsUpDown, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const ALL_SKILLS = [
  "React",
  "Next.js",
  "Javascript/Typescript",
  "Express.js",
  "Python",
  "Flask/FastAPI",
  "PostgreSQL/MongoDB",
  "AWS",
  "GCP",
  "Azure",
  "Tensorflow/Pytorch",
  "OpenCV",
  "Prisma",
  "TailwindCss",
  "Recoil",
  "Redux",
  "TanStack Query",
  "Zustand",
  "Socket.io",
  "Hono.js",
]

export default function Step1Skills({ onNext }: { onNext: (data: any, scoreData: any) => void }) {
  const [name, setName] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleNext = async () => {
    if (!name || selectedSkills.length === 0) {
      setError("Please enter your name and select at least one skill.")
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const tech_stack_used = selectedSkills.join("  ")

      const response = await axios.post("/api/profile-score", {
        name: name,
        tech_stack_used: tech_stack_used,
      })

      onNext({ name, skills: selectedSkills }, response.data)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to get profile score. Please try again.")
      console.error("Failed to get profile score", err)
    } finally {
      setIsLoading(false)
    }
  }

  const availableSkills = ALL_SKILLS.filter((skill) => !selectedSkills.includes(skill))

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-foreground">
          Your Name
        </label>
        <Input
          id="name"
          placeholder="Ada Lovelace"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-10"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">Your Skills</label>
        <div className="border rounded-lg min-h-12 p-3 flex flex-wrap gap-2 bg-muted/30">
          {selectedSkills.length === 0 ? (
            <span className="text-sm text-muted-foreground">No skills selected yet</span>
          ) : (
            selectedSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1 px-3 py-1">
                {skill}
                <X
                  className="h-3 w-3 cursor-pointer hover:opacity-70"
                  onClick={() => setSelectedSkills(selectedSkills.filter((s) => s !== skill))}
                />
              </Badge>
            ))
          )}
        </div>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-10 bg-foreground"
          >
            {selectedSkills.length > 0 ? "Select more skills..." : "Select skills..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search skills..." />
            <CommandList>
              <CommandEmpty>No skill found.</CommandEmpty>
              <CommandGroup>
                {availableSkills.map((skill) => (
                  <CommandItem
                    key={skill}
                    value={skill}
                    onSelect={() => {
                      setSelectedSkills([...selectedSkills, skill])
                      setOpen(false)
                    }}
                  >
                    {skill}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button onClick={handleNext} disabled={isLoading || !name || selectedSkills.length === 0} className="w-full h-10">
        {isLoading ? "Analyzing Profile..." : "Next"}
      </Button>
    </div>
  )
}
