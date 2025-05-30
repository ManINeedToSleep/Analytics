"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface GradientCardProps {
  children: React.ReactNode
  className?: string
  gradient?: "purple" | "blue" | "green" | "amber" | "red"
}

export function GradientCard({ children, className, gradient = "purple" }: GradientCardProps) {
  const gradients = {
    purple: "bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/20",
    blue: "bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20",
    green: "bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border-green-500/20",
    amber: "bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20",
    red: "bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border-red-500/20"
  }

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20",
      gradients[gradient],
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5" />
      <div className="relative">
        {children}
      </div>
    </Card>
  )
}
