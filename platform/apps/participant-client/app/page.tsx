"use client"

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "authenticated") {
    router.push("/dashboard")
    return null
  }

  const handleSignIn = () => {
    signIn("github", { callbackUrl: "/dashboard" })
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 flex flex-col items-center justify-center px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            The Ultimate Arena for Developers
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Discover, compete, and showcase your skills in the world's most exciting hackathons. Your next big project
            starts here.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          {status === "loading" ? (
            <p className="text-muted-foreground">Loading session...</p>
          ) : (
            <Button onClick={handleSignIn} size="lg" className="gap-2 px-8 py-6 text-base font-semibold">
              Get Started with GitHub
              <ArrowRight className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}