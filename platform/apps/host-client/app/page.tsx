"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./context/AuthContext"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowRight, Zap, Users, Trophy } from "lucide-react"
import Navbar from "@/components/Navbar"
import TypingEffect from "@/components/TypingEffect"

export default function HostRootPage() {
  const { token, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && token) {
      router.push("/dashboard")
    }
  }, [isLoading, token, router])

  if (isLoading || token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading your session...</p>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,oklch(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--border)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Gradient Blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            {/* Hero Section */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
                <span className="text-foreground">Launch & Manage </span>
                <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-extrabold">
                  Your Own Hackathon
                </span>
                <br />
                <TypingEffect 
                  text="Seamlessly" 
                  speed={100}
                  deleteSpeed={70}
                  pauseDuration={2500}
                  className="text-foreground"
                />
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Powerful AI tools, real-time insights, and seamless management for your hackathon events.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                onClick={() => router.push("/login")} 
                size="lg" 
                className="gap-2 px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              <div className="group p-6 rounded-xl border-2 border-primary/30 bg-card/50 backdrop-blur-sm hover:border-primary/60 hover:bg-card/70 hover:shadow-lg hover:shadow-primary/20 transition-all hover:scale-105 cursor-pointer">
                <div className="p-3 bg-primary/10 rounded-lg border-2 border-primary/20 w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Tools</h3>
                <p className="text-muted-foreground">Leverage AI for smarter hackathon management and insights</p>
              </div>

              <div className="group p-6 rounded-xl border-2 border-accent/30 bg-card/50 backdrop-blur-sm hover:border-accent/60 hover:bg-card/70 hover:shadow-lg hover:shadow-accent/20 transition-all hover:scale-105 cursor-pointer">
                <div className="p-3 bg-accent/10 rounded-lg border-2 border-accent/20 w-fit mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Team Management</h3>
                <p className="text-muted-foreground">Effortlessly manage participants, teams, and registrations</p>
              </div>

              <div className="group p-6 rounded-xl border-2 border-chart-2/30 bg-card/50 backdrop-blur-sm hover:border-chart-2/60 hover:bg-card/70 hover:shadow-lg hover:shadow-chart-2/20 transition-all hover:scale-105 cursor-pointer">
                <div className="p-3 bg-chart-2/10 rounded-lg border-2 border-chart-2/20 w-fit mx-auto mb-4 group-hover:bg-chart-2/20 transition-colors">
                  <Trophy className="h-8 w-8 text-chart-2" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-time Analytics</h3>
                <p className="text-muted-foreground">Track progress and announce winners with live updates</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
