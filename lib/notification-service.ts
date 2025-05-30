// Notification Service for Real-time Updates
import type { Notification } from "@/components/notification-system"

class NotificationService {
  private listeners: ((notification: Notification) => void)[] = []
  private notifications: Notification[] = []

  subscribe(callback: (notification: Notification) => void) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback)
    }
  }

  emit(notification: Notification) {
    this.notifications.push(notification)
    this.listeners.forEach(listener => listener(notification))
  }

  // Generate notifications based on AI insights
  generateInsightNotification(insight: any): Notification {
    const notificationMap = {
      engagement_alert: {
        type: "engagement_drop" as const,
        priority: "high" as const,
        title: "Engagement Drop Alert"
      },
      growth_opportunity: {
        type: "growth_opportunity" as const,
        priority: "medium" as const,
        title: "Growth Opportunity Identified"
      },
      health_summary: {
        type: "ai_insight" as const,
        priority: "low" as const,
        title: "Monthly Health Summary"
      },
      segmentation: {
        type: "ai_insight" as const,
        priority: "medium" as const,
        title: "User Segmentation Update"
      }
    }

    const config = notificationMap[insight.type] || {
      type: "ai_insight" as const,
      priority: "low" as const,
      title: "AI Insight"
    }

    return {
      id: `notification_${Date.now()}`,
      type: config.type,
      title: config.title,
      message: insight.summary,
      timestamp: new Date(),
      read: false,
      priority: config.priority,
      actionable: insight.actionableRecommendations.length > 0,
      data: insight
    }
  }

  // Monitor for engagement drops and auto-generate alerts
  monitorEngagementDrops(communityMetrics: any[]) {
    communityMetrics.forEach(metric => {
      const dropPercentage = ((metric.previousWeeklyInteractions - metric.weeklyInteractions) / metric.previousWeeklyInteractions) * 100
      
      if (dropPercentage > 30) {
        const notification: Notification = {
          id: `engagement_drop_${metric.communityId}_${Date.now()}`,
          type: "engagement_drop",
          title: "Critical Engagement Drop",
          message: `${metric.communityName} dropped ${dropPercentage.toFixed(1)}% in weekly interactions`,
          timestamp: new Date(),
          read: false,
          priority: "high",
          communityId: metric.communityId,
          communityName: metric.communityName,
          actionable: true,
          data: { metric, dropPercentage }
        }
        
        this.emit(notification)
      }
    })
  }

  // Auto-generate weekly summary notifications
  generateWeeklySummary() {
    const notification: Notification = {
      id: `weekly_summary_${Date.now()}`,
      type: "ai_insight",
      title: "Weekly Platform Summary",
      message: "Your weekly analytics summary is ready for review",
      timestamp: new Date(),
      read: false,
      priority: "low",
      actionable: true
    }
    
    this.emit(notification)
  }
}

export const notificationService = new NotificationService()

// Auto-generate weekly summaries
if (typeof window !== 'undefined') {
  setInterval(() => {
    notificationService.generateWeeklySummary()
  }, 7 * 24 * 60 * 60 * 1000) // Weekly
}
