# Dashboard Metrics Mapping

This document describes how the RYLYTICS dashboard metrics are calculated from the Prisma database schema and how trends are calculated.

## Core Database Models Used

### Primary Tables
- **Users**: Main user accounts (`id`, `email`, `isDeleted`, `createdAt`, `updatedAt`)
- **UserProfiles**: Profile information (`userId`, `isProfileActivated`, `createdAt`)
- **Communities**: Community data (`profileId`, `createdAt`, `updatedAt`, `memberCount`, `communityCount`, `isPrivate`)
- **CommunityConnections**: Community membership (`profileId`, `communityId`, `status`, `joinDate`, `createdAt`)
- **Events**: Events (`createdAt`, `isDeleted`, `eventTags`)
- **EventTag**: Junction table for event tagging (`eventId`, `tagId`, `createdAt`)
- **Tags**: Tag definitions (`id`, `name`, `createdAt`)
- **Logs**: Activity tracking (`actorId`, `actionType`, `createdAt`)
- **Subscriptions**: Paid subscriptions (`userId`, `communityId`, `isSubscriptionCancelled`, `paymentStatus`, `subscriptionType`, `subscriptionSubType`)
- **PlanTrials**: Free trial tracking (`userProfileId`, `trialEnd`, `createdAt`)
- **Plans**: Subscription plans (`price`, `planType`, `planSubType`)

## Dashboard Metrics Mapping

### Overview Cards

#### 1. Total Users
- **Query**: `Users.count({ where: { isDeleted: false } })`
- **Description**: Count of all registered, non-deleted users
- **Trend Calculation**: Compare today's total vs yesterday's total

#### 2. Active Communities
- **Query**: `Communities.count({ where: { updatedAt: { gte: last30Days } } })`
- **Description**: Communities with any activity in the last 30 days
- **Trend Calculation**: Compare today's active count vs yesterday's active count

#### 3. Profile Completions
- **Query**: `UserProfiles.count({ where: { isProfileActivated: true } })`
- **Description**: Users who have activated/completed their profiles
- **Trend Calculation**: Compare today's total vs yesterday's total

#### 4. Monthly Events
- **Query**: `Events.count({ where: { createdAt: { gte: currentMonth }, isDeleted: false } })`
- **Description**: Events created in the current month
- **Trend Calculation**: Compare current month vs last month

#### 5. Daily Active Users
- **Query**: `Logs.groupBy({ by: ['actorId'], where: { createdAt: { gte: last24h } } })`
- **Description**: Unique users with log activity in the last 24 hours
- **Trend Calculation**: Compare yesterday's active users vs two days ago

#### 6. Weekly Growth
- **Query**: `Users.count({ where: { createdAt: { gte: lastWeek }, isDeleted: false } })`
- **Description**: New user registrations in the last 7 days vs previous 7 days
- **Calculation**: `((thisWeek - lastWeek) / lastWeek) * 100`

#### 7. Content Created
- **Query**: Combined count of Events + Communities created in last 24h
- **Description**: Total content pieces (events + communities) created
- **Trend Calculation**: Compare yesterday's content vs two days ago

#### 8. Platform Health
- **Source**: System monitoring (mock data at 98.2%)
- **Description**: Overall system uptime and performance metrics
- **Note**: Would integrate with monitoring tools like DataDog, New Relic, etc.

#### 9. Free Trial Users
- **Query**: `PlanTrials.count({ where: { trialEnd: { gt: new Date() } } })`
- **Description**: Users currently in active free trial period
- **Trend Calculation**: Compare today's active trials vs yesterday's

#### 10. Trial Conversion Rate
- **Calculation**: 
  ```sql
  convertedTrials / totalTrialsCompleted * 100
  ```
- **Logic**: Users who completed trials and have active subscriptions
- **Trend Calculation**: Compare today's conversion rate vs yesterday's

#### 11. Monthly Recurring Revenue (MRR)
- **Query**: `Subscriptions.findMany({ where: { isSubscriptionCancelled: false, paymentStatus: 'active' }, include: { plan: true } })`
- **Calculation**: `Sum(activeSubs.plan.price) / 100` (convert from cents)
- **Trend Calculation**: Compare today's MRR vs yesterday's

## Community Analytics System

### Community Leaderboard Metrics

#### Community Ranking Calculation
- **Member Count**: `Communities.memberCount` (direct field)
- **Events Created**: `Events.count({ where: { communityId: community.id, isDeleted: false } })`
- **Engagement Rate**: 
  ```sql
  (activeMembers / totalMembers) * 100
  WHERE activeMembers = CommunityConnections.count({
    where: { 
      communityId: community.id, 
      status: 'ACCEPTED',
      joinDate: { gte: last30Days }
    }
  })
  ```
- **Growth Rate**: 
  ```sql
  ((currentMonthMembers - lastMonthMembers) / lastMonthMembers) * 100
  ```

#### Community Categories & Filtering
- **Categories**: Derived from `Communities.communityType` field
- **Verification Status**: `Communities.isVerified` boolean flag
- **Subscription Tiers**: Based on `Subscriptions.subscriptionSubType`:
  - `COMMUNITY_FREE_CARD`: Free tier
  - `COMMUNITY_CARD_MONTHLY/YEARLY`: Premium tier  
  - `COMMUNITY_CARD_PLUS_PLAN_MONTHLY/YEARLY`: Enterprise tier

#### Community Activity Metrics
- **Last Active**: `Communities.updatedAt` timestamp
- **Member Count**: `Communities.memberCount` (updated via triggers)
- **Community Request Count**: `Communities.communityRequestCount`
- **Event Referral Status**: `Communities.eventReferralSent` boolean

### Individual Community Analytics

#### Membership Analytics
- **Total Members**: `CommunityConnections.count({ where: { communityId, status: 'ACCEPTED' } })`
- **New Members (30d)**: `CommunityConnections.count({ where: { communityId, status: 'ACCEPTED', joinDate: { gte: 30daysAgo } } })`
- **Member Churn**: `CommunityConnections.count({ where: { communityId, status: 'DECLINED' or left } })`
- **Growth Trend**: Month-over-month member acquisition

#### Event Performance
- **Events Created**: `EventLink.count({ where: { communityId } }) + Events via community creator`
- **Event Attendance**: `EventParticipants.count({ where: { eventId: communityEvents } })`
- **Event Satisfaction**: Calculated from event feedback (future implementation)

#### Engagement Metrics
- **Posts & Comments**: Tracked via Logs table with `actionType` values
- **Active Contributors**: Users with recent activity in community
- **Moderator Activity**: `Communities.moderatorCount` and moderation logs

## Event & Tag System

### Event Tagging
- **Tag Assignment**: `EventTag` junction table links `Events` to `Tags`
- **Tag Categories**: `Tags.name` field with predefined categories:
  - Technology (AI, Web Development, Mobile, etc.)
  - Business (Startup, Marketing, Finance, etc.)
  - Arts & Design (UI/UX, Graphic Design, etc.)
  - Education (Workshop, Course, Seminar, etc.)
  - Networking (Meetup, Conference, Social, etc.)

#### Tag Analytics
- **Popular Tags**: 
  ```sql
  SELECT t.name, COUNT(et.eventId) as eventCount
  FROM Tags t
  JOIN EventTag et ON t.id = et.tagId
  JOIN Events e ON et.eventId = e.id
  WHERE e.isDeleted = false
  GROUP BY t.id, t.name
  ORDER BY eventCount DESC
  ```

- **Event Discovery**: Filter events by tag combinations
- **Trend Analysis**: Track tag popularity over time
- **Community Tag Preferences**: Most used tags per community

### Event Metrics
- **Event Creation Rate**: `Events.count({ where: { createdAt: { gte: timeRange } } })`
- **Event Categories**: Derived from associated tags
- **Event Engagement**: 
  - `EventParticipants.count({ where: { eventId, status: 'ATTENDING' } })`
  - Comments and interactions via Logs
- **Event Success Rate**: Attendance vs registration ratio

## Chart Components Data Sources

### Platform Growth Chart
- **Time Range**: Last 6 months
- **Metrics**: Cumulative Users, Communities, Events by month
- **Query Logic**: Count total records created up to each month end
- **Data Refresh**: Real-time on component mount

### Community Growth Chart (Communities Overview)
- **Time Range**: Last 6 months
- **Metrics**:
  - `Communities.count({ where: { createdAt: { lte: monthEnd } } })`
  - `Users.count({ where: { createdAt: { lte: monthEnd }, isDeleted: false } })`
  - `Events.count({ where: { createdAt: { lte: monthEnd }, isDeleted: false } })`

### User Engagement Chart (Bar Chart)
- **Time Range**: Last 30 days
- **Metrics**: 
  - New Users: `Users.count({ where: { createdAt: { gte: 30daysAgo } } })`
  - Active Users: Unique users in Logs table (last 30 days)
  - Profiles Created: `UserProfiles.count({ where: { createdAt: { gte: 30daysAgo } } })`
  - Communities Joined: `CommunityConnections.count({ where: { status: 'ACCEPTED', createdAt: { gte: 30daysAgo } } })`
  - Events Created: `Events.count({ where: { createdAt: { gte: 30daysAgo }, isDeleted: false } })`

### Community Category Distribution (Pie Chart)
- **Data Source**: `Communities.communityType` field
- **Calculation**: 
  ```sql
  SELECT communityType, COUNT(*) as count
  FROM Communities
  GROUP BY communityType
  ```

### Membership Tier Distribution
- **Data Source**: `Subscriptions` table joined with `Communities`
- **Tiers**:
  - Free: No active subscription
  - Premium: `COMMUNITY_CARD_MONTHLY/YEARLY`
  - Enterprise: `COMMUNITY_CARD_PLUS_PLAN_MONTHLY/YEARLY`

### Platform Conversion Metrics (Progress Bars)
1. **Email Verification**: `verifiedEmails / totalUsers * 100`
2. **Account Activation**: `activatedAccounts / totalUsers * 100`
3. **Profile Completion**: `completedProfiles / totalUsers * 100`
4. **Paid Conversion**: `paidSubscriptions / totalUsers * 100`

### Member Engagement Chart (Stacked Area)
- **Time Range**: Configurable (7d, 30d, 90d, 1y)
- **Aggregation Strategy**:
  - 7d: Daily data points
  - 30d: Weekly aggregates (5 points)
  - 90d: Bi-weekly aggregates (6 points)
  - 1y: Monthly aggregates (12 points)
- **Metrics**: 
  - User Activity: Unique users in Logs table per period
  - Profile Creation: UserProfiles created per period
  - Event Creation: Events created per period

## Community Management Analytics

### Community Health Metrics
- **Activity Score**: Combination of posts, events, and member engagement
- **Growth Velocity**: Rate of member acquisition over time
- **Engagement Quality**: Comments-to-posts ratio, event attendance rates
- **Retention Rate**: Members staying active after 30/60/90 days

### Community Performance Indicators
- **Top Performing Communities**: Ranked by engagement, growth, and activity
- **At-Risk Communities**: Low activity, declining membership
- **Rising Stars**: High growth rate communities
- **Mature Communities**: Stable, established communities

### Moderation & Management
- **Moderation Activity**: Actions taken by community moderators
- **Community Guidelines**: Compliance and violation tracking
- **Member Reports**: Issues reported within communities
- **Auto-Moderation**: Automated content filtering effectiveness

## Trend Calculation Logic

All trends use the same calculation method:

```typescript
function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}
```

### Time Periods for Trends
- **Overview Cards**: Yesterday vs 2 days ago
- **Monthly Events**: Current month vs last month
- **Weekly Growth**: Last 7 days vs previous 7 days
- **Community Growth**: Current month vs last month
- **Member Engagement**: Current period vs previous period

## Data Refresh Strategy

### Server-Side Analytics Pages
- All community analytics use server-side data fetching
- Real-time calculations on each page load
- Query parameter-based filtering for specific communities
- No client-side routing for individual community data

### API Routes for Charts
- `/api/analytics/community-leaderboard` - Top communities with ranking
- `/api/analytics/community-overview` - Aggregate community metrics
- `/api/analytics/community-details?id=` - Specific community data
- `/api/analytics/community-growth` - Growth trends
- `/api/analytics/event-tags` - Tag usage and trends

### Client-Side Components
- Charts fetch data on component mount
- Loading states while fetching
- Fallback to mock data if database queries fail
- Error handling with console logging

## Error Handling

### Database Connection Issues
- All components have fallback mock data
- Error logging to console
- Graceful degradation with loading states

### Data Validation
- Type-safe interfaces for all data structures
- Null/undefined checks with optional chaining
- Default values for empty datasets

## Performance Considerations

### Query Optimization
- Use `count()` instead of `findMany().length` for counting
- Parallel queries with `Promise.all()` where possible
- Efficient date range filtering
- Minimal data selection (only required fields)

### Database Indexes
Recommended indexes for optimal performance:
```sql
-- Users table
CREATE INDEX idx_users_created_at ON Users(createdAt);
CREATE INDEX idx_users_deleted ON Users(isDeleted);

-- Events table  
CREATE INDEX idx_events_created_at ON Events(createdAt);
CREATE INDEX idx_events_deleted ON Events(isDeleted);

-- Communities table
CREATE INDEX idx_communities_updated ON Communities(updatedAt);
CREATE INDEX idx_communities_type ON Communities(communityType);
CREATE INDEX idx_communities_member_count ON Communities(memberCount);

-- CommunityConnections table
CREATE INDEX idx_community_connections_community_status ON CommunityConnections(communityId, status);
CREATE INDEX idx_community_connections_join_date ON CommunityConnections(joinDate);

-- EventTag table
CREATE INDEX idx_event_tag_event ON EventTag(eventId);
CREATE INDEX idx_event_tag_tag ON EventTag(tagId);

-- Tags table
CREATE INDEX idx_tags_name ON Tags(name);

-- Logs table
CREATE INDEX idx_logs_actor_created ON Logs(actorId, createdAt);
CREATE INDEX idx_logs_created_action ON Logs(createdAt, actionType);

-- Subscriptions table
CREATE INDEX idx_subscriptions_status ON Subscriptions(isSubscriptionCancelled, paymentStatus);
CREATE INDEX idx_subscriptions_community ON Subscriptions(communityId);

-- PlanTrials table
CREATE INDEX idx_plan_trials_end ON PlanTrials(trialEnd);
```

## Future Enhancements

### Real-Time Data
- Consider WebSocket connections for live updates
- Redis caching for frequently accessed metrics
- Background job for pre-calculating heavy aggregations

### Advanced Community Analytics
- Cohort analysis for member retention
- Community health scoring algorithm
- Predictive analytics for community growth
- Network analysis of community interactions

### Enhanced Tag System
- Machine learning for automatic tag suggestions
- Tag trend analysis and recommendations
- Cross-community tag analytics
- Tag-based event recommendations

### Monitoring Integration
- DataDog/New Relic for platform health metrics
- Alert thresholds for critical metrics
- Automated anomaly detection

## Data Sources Split (Hybrid Approach)

### PostgreSQL (Neon/Vercel)
- Core user data (Users, UserProfiles)
- Community data (Communities, CommunityConnections)
- Event data (Events, EventParticipants, EventTag, Tags)
- Subscription data (Subscriptions, Plans, PlanTrials)
- System logs (Logs)

### Mixpanel (Event Tracking)
- User behavior analytics
- Feature usage tracking
- Conversion funnel analysis
- A/B testing results
- Community engagement events
- Event interaction tracking

This hybrid approach allows for:
- Transactional data in PostgreSQL for consistency
- Behavioral analytics in Mixpanel for advanced insights
- Real-time event tracking without impacting main database
- Specialized analytics tools for each use case 