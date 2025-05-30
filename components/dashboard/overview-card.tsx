import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { FadeIn } from "@/components/ui/fade-in"
import { cn } from "@/lib/utils"

interface OverviewCardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  delay?: number
  gradient?: "purple" | "blue" | "green" | "amber" | "red"
}

export function OverviewCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  delay = 0,
  gradient = "purple"
}: OverviewCardProps) {
  const numericValue = typeof value === 'string' ? 
    parseInt(value.replace(/[^0-9]/g, '')) : value

  const gradients = {
    purple: "from-purple-500/10 to-purple-600/5 border-purple-500/20 hover:shadow-purple-500/20",
    blue: "from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:shadow-blue-500/20",
    green: "from-green-500/10 to-green-600/5 border-green-500/20 hover:shadow-green-500/20",
    amber: "from-amber-500/10 to-amber-600/5 border-amber-500/20 hover:shadow-amber-500/20",
    red: "from-red-500/10 to-red-600/5 border-red-500/20 hover:shadow-red-500/20"
  }

  return (
    <FadeIn delay={delay} direction="up">
      <Card className={cn(
        "relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl group cursor-pointer",
        "bg-gradient-to-br border backdrop-blur-sm",
        gradients[gradient]
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {title}
          </CardTitle>
          <div className="h-4 w-4 text-muted-foreground group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-lg sm:text-xl lg:text-2xl font-bold group-hover:scale-105 transition-transform duration-300">
            {typeof value === 'string' && !isNaN(numericValue) ? (
              <AnimatedCounter 
                end={numericValue} 
                suffix={value.replace(/[0-9]/g, '')} 
              />
            ) : (
              value
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-1 group-hover:text-muted-foreground/80 transition-colors">
              {description}
            </p>
          )}
          {trend && (
            <div className="mt-2 flex items-center text-xs">
              <span className={cn(
                "font-medium transition-colors",
                trend.isPositive 
                  ? "text-green-600 dark:text-green-400" 
                  : "text-red-600 dark:text-red-400"
              )}>
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
              <span className="ml-1 text-muted-foreground">from last period</span>
            </div>
          )}
        </CardContent>
      </Card>
    </FadeIn>
  )
}
