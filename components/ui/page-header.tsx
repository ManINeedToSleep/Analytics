/**
 * @file PageHeader.tsx
 * @description A reusable page header component with a title, optional description, and optional action buttons.
 * This component standardizes the look and feel of page titles across the application,
 * incorporating a fade-in animation for a smooth user experience. It's designed to be
 * used at the top of main content areas within pages.
 */
import type React from 'react';
import { FadeIn } from '@/components/ui/fade-in';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <FadeIn>
      <div className={`space-y-2 ${className || ''}`}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </h1>
            {description && (
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
        </div>
      </div>
    </FadeIn>
  );
} 