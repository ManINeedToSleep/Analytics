/**
 * @file overview-card.tsx
 * @description A card component for displaying overview metrics with a title, value, description, icon, and trend.
 * It supports an accent color for a top border highlight and uses a dark theme.
 */
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { FadeIn } from "@/components/ui/fade-in"
import { cn } from "@/lib/utils"
import {
  Users, Building, UserCheck, Calendar, Activity, TrendingUp, Zap, BarChart3,
  UserPlus, Percent, DollarSign, // Added new icons
  Icon as LucideIcon // Generic Icon type
} from "lucide-react"

// Icon mapping
const iconComponents: { [key: string]: LucideIcon } = {
  Users,
  Building,
  UserCheck,
  Calendar,
  Activity,
  TrendingUp,
  Zap,
  BarChart3,
  UserPlus,   // Added UserPlus
  Percent,    // Added Percent
  DollarSign, // Added DollarSign
}

interface OverviewCardProps {
  title: string
  value: string | number
  description?: string
  iconName: string // Changed from React.ReactNode to string key for icon map
  trend?: {
    value: number
    isPositive: boolean
  }
  delay?: number
  accentColor?: "purple" | "blue" | "green" | "amber" | "teal" // Added teal
  wrapperClassName?: string; // I'm adding this prop
}

export function OverviewCard({ 
  title, 
  value, 
  description, 
  iconName, 
  trend, 
  delay = 0,
  accentColor,
  wrapperClassName, // I'm destructuring the new prop
}: OverviewCardProps) {
  const numericValue = typeof value === 'string' ? 
    parseFloat(value.replace(/[^0-9.]/g, '')) : value
  const valueSuffix = typeof value === 'string' ? value.replace(/[0-9.,]/g, '') : ''

  const IconComponent = iconComponents[iconName] || Users

  const accentClasses: { [key: string]: string } = {
    purple: "border-t-purple-500",
    blue: "border-t-blue-500",
    green: "border-t-green-500",
    amber: "border-t-amber-500",
    teal: "border-t-teal-500", // Added teal border
  }

  return (
    <FadeIn delay={delay} direction="up" className={wrapperClassName}>
      <Card
        className={cn(
          "bg-neutral-900 text-white rounded-lg shadow-md p-5 flex flex-col justify-between h-full", // Dark theme, padding, flex layout
          "border border-neutral-700/50 transition-all duration-300 hover:border-neutral-600/80 hover:bg-neutral-800/60", // Subtle border and hover
          accentColor && accentClasses[accentColor] ? `${accentClasses[accentColor]} border-t-4` : "border-t-4 border-t-transparent" // Top accent border
        )}
      >
        <CardHeader className="flex flex-row items-start justify-between p-0 mb-3">
          <CardTitle className="text-sm font-medium text-neutral-400">
            {title}
          </CardTitle>
          <IconComponent className={cn(
            "h-5 w-5 text-neutral-500",
            accentColor && {
              "purple": "text-purple-500",
              "blue": "text-blue-500",
              "green": "text-green-500",
              "amber": "text-amber-500",
              "teal": "text-teal-500", // Added teal icon color
            }[accentColor]
          )} />
        </CardHeader>
        <CardContent className="p-0 flex flex-col flex-grow">
          <div className="text-3xl font-bold text-white mb-1">
            {typeof value === 'string' && !isNaN(numericValue) ? (
              <AnimatedCounter end={numericValue} suffix={valueSuffix} decimals={valueSuffix === '%' ? 1 : 0} />
            ) : (
              value
            )}
          </div>
          {description && (
            <p className="text-xs text-neutral-400 mb-2 flex-grow">
              {description}
            </p>
          )}
          {trend && (
            <div className="flex items-center text-xs mt-auto">
              <span
                className={cn(
                  "font-medium",
                  trend.isPositive
                    ? "text-green-400"
                    : "text-red-400"
                )}
              >
                {trend.isPositive ? "+" : ""}
                {Math.abs(trend.value)}%
              </span>
              <span className="ml-1.5 text-neutral-500">from 2 days ago</span>
            </div>
          )}
        </CardContent>
      </Card>
    </FadeIn>
  )
}
