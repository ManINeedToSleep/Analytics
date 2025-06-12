/**
 * Utility Functions - RYLYTICS Core Helpers
 * 
 * Central utility functions used across the analytics dashboard.
 * Provides className merging functionality for consistent styling.
 * 
 * Key Function:
 * - cn(): Merges Tailwind CSS classes with conflict resolution
 * 
 * Dependencies:
 * - clsx: Conditional className utility
 * - tailwind-merge: Resolves Tailwind class conflicts
 * 
 * Usage Pattern:
 * cn("bg-red-500", "bg-blue-500") → "bg-blue-500" (last wins)
 * cn("px-4 py-2", isActive && "bg-blue-500") → conditional styling  
 * 
 * Connected to:
 * - All component files that need dynamic className generation
 * - Used extensively in shadcn/ui components for style composition
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and deduplicates className strings with Tailwind conflict resolution
 * 
 * This function is essential for dynamic styling in the dashboard.
 * It handles conditional classes and resolves Tailwind CSS conflicts
 * by ensuring the last specified utility class takes precedence.
 * 
 * @param inputs - Variable number of className values (strings, objects, arrays)
 * @returns Merged and deduplicated className string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
