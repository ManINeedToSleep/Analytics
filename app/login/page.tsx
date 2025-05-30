"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { FadeIn } from "@/components/ui/fade-in"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (email === "admin@rylytics.com" && password === "password") {
        toast({
          title: "Welcome back! ✨",
          description: "Successfully logged into RYLYTICS Analytics Dashboard",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Authentication failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950 p-4 transition-all duration-700">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 dark:bg-indigo-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Centered Login Card */}
      <div className="w-full max-w-md relative z-10">
        <FadeIn>
          <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl">
            <CardHeader className="space-y-4 text-center pb-8">
              <FadeIn delay={200}>
                <div className="flex justify-center mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-2xl">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={300}>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  RYLYTICS
                </h1>
                <p className="text-sm text-muted-foreground font-medium">Internal Analytics Platform</p>
              </FadeIn>
              <FadeIn delay={400}>
                <CardTitle className="text-2xl text-center mt-6">Welcome back</CardTitle>
                <CardDescription className="text-center text-base">
                  Sign in to access your analytics dashboard
                </CardDescription>
              </FadeIn>
            </CardHeader>

            <form onSubmit={handleLogin}>
              <CardContent className="space-y-6 px-8">
                <FadeIn delay={500}>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@rylytics.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 text-base"
                    />
                  </div>
                </FadeIn>

                <FadeIn delay={600}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <Link
                        href="#"
                        className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 pr-12 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 text-base"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                  </div>
                </FadeIn>
              </CardContent>

              <CardFooter className="px-8 pb-8">
                <FadeIn delay={700} className="w-full">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-300 transform hover:scale-105 disabled:transform-none text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in to Dashboard
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </FadeIn>
              </CardFooter>
            </form>
          </Card>

          <FadeIn delay={800}>
            <div className="text-center mt-8 space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Demo credentials:</strong>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 font-mono bg-white/50 dark:bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                admin@rylytics.com / password
              </p>
            </div>
          </FadeIn>
        </FadeIn>
      </div>
    </div>
  )
}
