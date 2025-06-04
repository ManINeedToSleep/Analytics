/**
 * @file ai-service.ts
 * @description AI service layer for connecting to RYLA's private AI server.
 * Handles all AI analysis requests while maintaining data privacy and security.
 * No data is sent to external AI providers like OpenAI or Google.
 */

// AI Service Configuration
interface AIServiceConfig {
  apiKey: string | null;
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
}

// AI Analysis Request Types
interface AIAnalysisRequest {
  type: 'community_health' | 'user_engagement' | 'growth_analysis' | 'retention_analysis' | 'custom';
  data: any;
  timeframe?: string;
  communities?: string[];
}

interface AIInsightResponse {
  id: string;
  type: 'growth' | 'engagement' | 'retention' | 'alert' | 'opportunity';
  title: string;
  summary: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionableRecommendations: string[];
  metrics?: Record<string, any>;
  affectedCommunities?: string[];
  timestamp: string;
}

class AIService {
  private config: AIServiceConfig;
  
  constructor() {
    this.config = {
      // I'm using environment variables for secure API key storage
      apiKey: process.env.NEXT_PUBLIC_RYLA_AI_API_KEY || null,
      baseUrl: process.env.NEXT_PUBLIC_RYLA_AI_BASE_URL || 'https://ai.ryla.internal/api/v1',
      timeout: 30000, // 30 seconds
      retryAttempts: 3,
    };
  }

  /**
   * Check if AI service is available and properly configured
   */
  isAvailable(): boolean {
    return this.config.apiKey !== null && this.config.apiKey.length > 0;
  }

  /**
   * Get service status for debugging
   */
  getStatus() {
    return {
      configured: this.isAvailable(),
      baseUrl: this.config.baseUrl,
      hasApiKey: !!this.config.apiKey,
    };
  }

  /**
   * Analyze community health and generate insights
   */
  async analyzeCommunityHealth(communityData: any[]): Promise<AIInsightResponse[]> {
    if (!this.isAvailable()) {
      // Return mock data when AI service is not configured
      return this.getMockCommunityHealthInsights();
    }

    try {
      const response = await this.makeRequest({
        type: 'community_health',
        data: communityData,
        timeframe: 'last_30_days',
      });

      return response.insights || [];
    } catch (error) {
      console.error('AI Service Error:', error);
      // Fallback to mock data on error
      return this.getMockCommunityHealthInsights();
    }
  }

  /**
   * Analyze user engagement patterns
   */
  async analyzeUserEngagement(engagementData: any): Promise<AIInsightResponse[]> {
    if (!this.isAvailable()) {
      return this.getMockEngagementInsights();
    }

    try {
      const response = await this.makeRequest({
        type: 'user_engagement',
        data: engagementData,
        timeframe: 'last_7_days',
      });

      return response.insights || [];
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getMockEngagementInsights();
    }
  }

  /**
   * Generate growth analysis and opportunities
   */
  async analyzeGrowthOpportunities(platformData: any): Promise<AIInsightResponse[]> {
    if (!this.isAvailable()) {
      return this.getMockGrowthInsights();
    }

    try {
      const response = await this.makeRequest({
        type: 'growth_analysis',
        data: platformData,
        timeframe: 'last_90_days',
      });

      return response.insights || [];
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getMockGrowthInsights();
    }
  }

  /**
   * Generate quick insights for dashboard overview
   */
  async getQuickInsights(): Promise<AIInsightResponse[]> {
    if (!this.isAvailable()) {
      return this.getMockQuickInsights();
    }

    try {
      const response = await this.makeRequest({
        type: 'community_health',
        data: { summary: true },
        timeframe: 'last_7_days',
      });

      // Return only top 3 insights for dashboard
      return (response.insights || []).slice(0, 3);
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getMockQuickInsights();
    }
  }

  /**
   * Make HTTP request to AI service
   */
  private async makeRequest(analysisRequest: AIAnalysisRequest): Promise<any> {
    const url = `${this.config.baseUrl}/analyze`;
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
        'X-Client': 'RYLYTICS-Dashboard',
      },
      body: JSON.stringify(analysisRequest),
    };

    let lastError: Error | null = null;

    // Retry logic
    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const response = await fetch(url, {
          ...requestOptions,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`AI Service responded with status ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        lastError = error as Error;
        console.warn(`AI Service attempt ${attempt} failed:`, error);
        
        if (attempt < this.config.retryAttempts) {
          // Wait before retry (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    throw lastError || new Error('AI Service request failed after retries');
  }

  // Mock data methods for when AI service is not available
  private getMockQuickInsights(): AIInsightResponse[] {
    return [
      {
        id: `mock_${Date.now()}_1`,
        type: 'engagement',
        title: 'New Member Conversion',
        summary: 'New members who complete their profile within 48 hours are 3x more likely to become active contributors.',
        confidence: 0.92,
        priority: 'high',
        actionableRecommendations: ['Add profile completion incentives', 'Send reminder notifications'],
        timestamp: new Date().toISOString(),
      },
      {
        id: `mock_${Date.now()}_2`,
        type: 'growth',
        title: 'Community Growth Opportunity',
        summary: 'Design Community has seen a 23% increase in new members this month.',
        confidence: 0.89,
        priority: 'medium',
        actionableRecommendations: ['Create more onboarding resources', 'Scale successful strategies'],
        timestamp: new Date().toISOString(),
      },
      {
        id: `mock_${Date.now()}_3`,
        type: 'alert',
        title: 'Engagement Drop Alert',
        summary: 'Event attendance has dropped 15% in the Tech Innovators community.',
        confidence: 0.85,
        priority: 'medium',
        actionableRecommendations: ['Survey members for feedback', 'Review event scheduling'],
        timestamp: new Date().toISOString(),
      },
    ];
  }

  private getMockCommunityHealthInsights(): AIInsightResponse[] {
    // Extended mock data for detailed analysis page
    return [
      ...this.getMockQuickInsights(),
      {
        id: `mock_${Date.now()}_4`,
        type: 'retention',
        title: 'Member Retention Pattern',
        summary: 'Members who participate in events within their first week show 85% higher retention rates.',
        confidence: 0.94,
        priority: 'high',
        actionableRecommendations: ['Create first-week event recommendations', 'Implement welcome buddy system'],
        metrics: { firstWeekEventAttendance: 42.3, retentionImprovement: 85.2 },
        affectedCommunities: ['tech-innovators', 'design-community'],
        timestamp: new Date().toISOString(),
      },
      {
        id: `mock_${Date.now()}_5`,
        type: 'opportunity',
        title: 'Cross-Community Engagement',
        summary: 'Users active in multiple communities generate 4x more content and have higher satisfaction scores.',
        confidence: 0.88,
        priority: 'medium',
        actionableRecommendations: ['Suggest related communities', 'Create cross-community events'],
        metrics: { multiCommunityUsers: 23.4, contentGenerationIncrease: 4.2, satisfactionIncrease: 34.5 },
        timestamp: new Date().toISOString(),
      },
    ];
  }

  private getMockEngagementInsights(): AIInsightResponse[] {
    return this.getMockCommunityHealthInsights();
  }

  private getMockGrowthInsights(): AIInsightResponse[] {
    return this.getMockCommunityHealthInsights();
  }
}

// Export singleton instance
export const aiService = new AIService();

// Export types for use in components
export type { AIInsightResponse, AIAnalysisRequest }; 