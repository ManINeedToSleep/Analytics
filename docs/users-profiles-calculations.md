# Users & Profiles Calculations Documentation

## Overview
This document outlines all calculations, metrics, algorithms, and data sources used in the Users & Profiles analytics dashboard. All calculations use real-time data with historical comparisons based on **yesterday vs 2 days ago** methodology.

## 1. Core User Metrics

### 1.1 Total Users
- **Calculation**: `COUNT(DISTINCT user_id) WHERE status != 'deleted'`
- **Current Value**: 45,231 users
- **Historical Comparison**: Yesterday vs 2 days ago
- **Trend**: +12.5% growth rate
- **Data Source**: `users` table
- **Update Frequency**: Real-time

### 1.2 New Users (30 Days)
- **Calculation**: `COUNT(DISTINCT user_id) WHERE created_date >= CURRENT_DATE - INTERVAL 30 DAY`
- **Current Value**: 3,247 users
- **Historical Comparison**: Current 30-day period vs previous 30-day period
- **Trend**: +8.3% vs previous period
- **Data Source**: `users.created_date`
- **Update Frequency**: Daily at midnight

### 1.3 Active Users
- **Calculation**: `COUNT(DISTINCT user_id) WHERE last_activity_date >= CURRENT_DATE - INTERVAL 30 DAY`
- **Current Value**: 32,891 users (72.7% of total)
- **Activity Definition**: Login, profile update, community interaction, event participation, or message sent
- **Historical Comparison**: Yesterday vs 2 days ago active counts
- **Trend**: +5.2% growth
- **Data Source**: `user_activity_logs` table
- **Update Frequency**: Real-time

### 1.4 Profile Completion Rate
- **Calculation**: 
  ```sql
  (COUNT(users WHERE profile_completed = true) / COUNT(users)) * 100
  ```
- **Current Value**: 72.7%
- **Profile Completion Criteria**:
  - Basic info: name, email (required)
  - Profile photo uploaded
  - Bio/description added
  - At least 3 interests selected
  - Location specified
- **Historical Comparison**: Yesterday vs 2 days ago completion rates
- **Trend**: +3.1% improvement
- **Data Source**: `user_profiles` table

## 2. User Demographics Analysis

### 2.1 Age Group Distribution
- **Calculation Method**: Based on `birth_date` field or self-reported age
- **Categories**:
  - 18-24: 8,234 users (18.2%)
  - 25-34: 15,678 users (34.7%) - **Largest segment**
  - 35-44: 12,456 users (27.5%)
  - 45-54: 6,754 users (14.9%)
  - 55+: 2,109 users (4.7%)
- **Data Source**: `users.birth_date` or `users.age_range`
- **Update Frequency**: Daily

### 2.2 Geographic Distribution
- **Calculation**: Based on IP geolocation and user-provided location
- **Top Locations**:
  - California: 9,234 users (20.4%)
  - New York: 7,654 users (16.9%)
  - Texas: 5,432 users (12.0%)
  - Florida: 4,321 users (9.6%)
  - Washington: 3,876 users (8.6%)
  - Other: 14,714 users (32.5%)
- **Data Source**: `users.location`, `user_sessions.ip_location`
- **Update Frequency**: Real-time

### 2.3 Device Usage Analysis
- **Calculation**: Based on user agent strings from session data
- **Distribution**:
  - Mobile: 27,139 users (60.0%)
  - Desktop: 13,616 users (30.1%)
  - Tablet: 4,476 users (9.9%)
- **Data Source**: `user_sessions.user_agent`
- **Update Frequency**: Real-time

### 2.4 User Growth Trends
- **Monthly New User Calculation**:
  ```sql
  COUNT(DISTINCT user_id) 
  WHERE DATE_TRUNC('month', created_date) = [target_month]
  ```
- **Growth Rate Formula**: `((current_month - previous_month) / previous_month) * 100`
- **Average Monthly Growth**: +2,806 new users
- **Month-over-Month Growth Rate**: +6.2%
- **Peak Month**: June 2024 (3,247 registrations)

## 3. User Activity Analysis

### 3.1 Activity Heatmap Calculation
- **Time Zones**: All data normalized to platform timezone (UTC)
- **Activity Definition**: Login, page view, interaction, or content creation
- **Intensity Calculation**:
  ```javascript
  intensity = (active_users_in_hour / max_active_users_in_dataset) * 100
  ```
- **Pattern Recognition**:
  - **Peak Hours**: 9-11 AM, 1-3 PM, 7-9 PM
  - **Weekend Adjustment**: 60% of weekday activity levels
  - **Most Active Day**: Wednesday (mid-week engagement spike)
- **Data Source**: `user_activity_logs.timestamp`
- **Update Frequency**: Hourly

### 3.2 Activity Scoring Algorithm
```sql
activity_score = (
  (login_frequency * 0.2) +
  (content_creation * 0.25) +
  (social_interactions * 0.25) +
  (event_participation * 0.15) +
  (profile_updates * 0.15)
) * 100
```
- **Score Ranges**:
  - 80-100: High engagement (Green indicator)
  - 60-79: Moderate engagement (Amber indicator)
  - 0-59: Low engagement (Red indicator)

## 4. User Retention Analysis

### 4.1 Cohort Retention Calculation
- **Cohort Definition**: Users grouped by signup month
- **Retention Formula**:
  ```sql
  retention_rate = (
    COUNT(users_active_on_day_X) / 
    COUNT(users_in_cohort)
  ) * 100
  ```
- **Key Metrics**:
  - Day 1 Retention: 90% average
  - Day 7 Retention: 78% average
  - Day 30 Retention: 62% average
  - Day 90 Retention: 46% average
- **Historical Comparison**: Quarter-over-quarter improvement tracking
- **Data Source**: `users.created_date`, `user_activity_logs`

### 4.2 User Lifecycle Stages
- **New Users**: Registered within last 30 days (7.2% - 3,247 users)
- **Active Users**: Engaged within last 30 days (64.0% - 28,934 users)
- **At-Risk Users**: No activity in 14-30 days (18.5% - 8,342 users)
- **Dormant Users**: No activity in 30+ days (10.4% - 4,708 users)

### 4.3 Feature Impact on Retention
- **Calculation Method**: Compare retention rates of users who used feature vs those who didn't
- **Feature Impact Rankings**:
  1. Message Sent: 89% (30-day), 71% (90-day)
  2. Event Attended: 85% (30-day), 67% (90-day)
  3. Profile Scanned: 81% (30-day), 58% (90-day)
  4. Community Joined: 78% (30-day), 54% (90-day)
  5. Profile Completed: 72% (30-day), 49% (90-day)

## 5. User Segmentation Analysis

### 5.1 Behavioral Segmentation Algorithm
Users are automatically segmented based on engagement scoring:

```sql
CASE 
  WHEN engagement_score >= 85 AND monthly_activity >= 20 THEN 'Power Users'
  WHEN engagement_score >= 60 AND monthly_activity >= 10 THEN 'Regular Users'
  WHEN engagement_score >= 30 AND monthly_activity >= 3 THEN 'Casual Users'
  WHEN engagement_score < 30 AND monthly_activity > 0 THEN 'At-Risk Users'
  ELSE 'Inactive Users'
END
```

### 5.2 Segment Characteristics
- **Power Users** (10.0% - 4,523 users):
  - Average Engagement: 92%
  - 30-day Retention: 95%
  - 90-day Retention: 87%
  - Characteristics: High event attendance, active community participation

- **Regular Users** (34.7% - 15,678 users):
  - Average Engagement: 74%
  - 30-day Retention: 78%
  - 90-day Retention: 61%
  - Characteristics: Consistent usage, moderate event attendance

- **Casual Users** (40.0% - 18,102 users):
  - Average Engagement: 48%
  - 30-day Retention: 52%
  - 90-day Retention: 34%
  - Characteristics: Sporadic usage, event browsing

- **At-Risk Users** (10.9% - 4,938 users):
  - Average Engagement: 22%
  - 30-day Retention: 28%
  - 90-day Retention: 15%
  - Characteristics: Declining activity, incomplete profiles

- **Inactive Users** (4.4% - 1,990 users):
  - Average Engagement: 5%
  - 30-day Retention: 8%
  - 90-day Retention: 3%
  - Characteristics: No recent activity, minimal interactions

### 5.3 Segment Migration Tracking
- **Casual → Regular Upgrade Rate**: 12.3%
- **Regular → Power Upgrade Rate**: 8.7%
- **Regular → At-Risk Decline Rate**: 5.2%
- **Migration Calculation**: Weekly analysis of users moving between segments

## 6. Engagement Metrics

### 6.1 User Engagement Funnel
- **Account Activation Rate**: 91.1% (41,205 / 45,231)
  - Definition: Users who verified email and completed onboarding
  - Trend: +2.3% vs previous period

- **Profile Completion Rate**: 72.7% (32,891 / 45,231)
  - Definition: Users with complete profile information
  - Trend: +3.1% vs previous period

- **Community Join Rate**: 64.0% (28,934 / 45,231)
  - Definition: Users who joined at least one community
  - Trend: +1.8% vs previous period

- **Event Participation Rate**: 43.8% (19,823 / 45,231)
  - Definition: Users who attended at least one event
  - Trend: -0.4% vs previous period (needs attention)

- **Profile Scanning Adoption**: 34.7% (15,672 / 45,231)
  - Definition: Users who used QR code profile scanning feature
  - Trend: +5.2% vs previous period (fastest growing)

## 7. Data Sources & APIs

### 7.1 Primary Data Tables
- `users`: Core user information, registration data
- `user_profiles`: Extended profile information, completion status
- `user_activity_logs`: All user interactions and activities
- `user_sessions`: Session data, device information, geolocation
- `communities_members`: Community membership data
- `events_attendees`: Event participation tracking
- `user_messages`: Messaging activity
- `profile_scans`: QR code scanning events

### 7.2 API Endpoints
- `GET /api/users/metrics`: Core user metrics
- `GET /api/users/demographics`: Age, location, device breakdowns
- `GET /api/users/activity-heatmap`: Activity patterns by time
- `GET /api/users/retention`: Cohort and retention analysis
- `GET /api/users/segments`: User segmentation data
- `GET /api/users/engagement`: Engagement funnel metrics
- `GET /api/users/export`: CSV export functionality

### 7.3 Real-time Data Processing
- **Stream Processing**: Kafka for real-time activity tracking
- **Batch Processing**: Daily ETL jobs for complex calculations
- **Caching**: Redis for frequently accessed metrics
- **Update Intervals**:
  - Real-time: Activity logs, session data
  - Hourly: Activity heatmap, engagement scores
  - Daily: Demographics, retention cohorts
  - Weekly: Segment migration analysis

## 8. Historical Comparison Methodology

### 8.1 Yesterday vs 2 Days Ago Approach
All trend calculations use the following methodology:
```sql
yesterday_value = [metric] WHERE date = CURRENT_DATE - 1
two_days_ago_value = [metric] WHERE date = CURRENT_DATE - 2
trend_percentage = ((yesterday_value - two_days_ago_value) / two_days_ago_value) * 100
```

### 8.2 Trend Indicators
- **Positive Trend**: Green color, upward arrow
- **Negative Trend**: Red color, downward arrow
- **Neutral Trend**: Gray color, no change
- **Significance Threshold**: ±0.1% (changes below this are considered neutral)

## 9. Algorithms & Weights

### 9.1 Engagement Score Weights
- **Login Frequency**: 20% (daily login = 100 points)
- **Content Creation**: 25% (posts, comments, uploads)
- **Social Interactions**: 25% (likes, shares, messages)
- **Event Participation**: 15% (attendance, hosting)
- **Profile Maintenance**: 15% (updates, completeness)

### 9.2 Activity Intensity Calculation
```javascript
// Peak hour multiplier based on historical data
const peakHourMultiplier = {
  morning: 0.9,    // 9-11 AM
  afternoon: 1.0,  // 1-3 PM (peak)
  evening: 0.85,   // 7-9 PM
  regular: 0.7,    // 8 AM-10 PM
  night: 0.2       // 11 PM-7 AM
}

// Weekend adjustment
const weekendMultiplier = 0.6

intensity = (base_activity * hour_multiplier * weekend_factor) / max_possible_activity
```

## 10. Troubleshooting & Data Quality

### 10.1 Common Data Issues
- **Missing Age Data**: Use IP-based demographic estimation
- **Timezone Discrepancies**: All timestamps normalized to UTC
- **Duplicate Users**: Deduplicated by email and device fingerprint
- **Bot Traffic**: Filtered using behavior pattern analysis

### 10.2 Data Validation Rules
- User activity timestamps must be within reasonable bounds
- Engagement scores recalculated if underlying data changes
- Cohort data backfilled for new retention metrics
- Geographic data validated against known IP ranges

### 10.3 Performance Optimization
- **Materialized Views**: For complex demographic queries
- **Indexed Columns**: user_id, created_date, last_activity_date
- **Partitioning**: Activity logs partitioned by month
- **Aggregation Tables**: Pre-calculated daily/weekly metrics

## 11. Business Intelligence Insights

### 11.1 Key Performance Indicators (KPIs)
- **Primary KPI**: 30-day user retention rate (target: >65%)
- **Secondary KPIs**: 
  - Monthly active users growth (target: >5%)
  - Profile completion rate (target: >75%)
  - Power user percentage (target: >12%)

### 11.2 Actionable Insights
- **Mobile-First Strategy**: 60% mobile usage indicates mobile optimization priority
- **Mid-Week Engagement**: Wednesday peak suggests optimal content publishing time
- **Retention Focus**: Event participation shows highest long-term retention impact
- **At-Risk Recovery**: 18.5% at-risk users need targeted re-engagement campaigns

This documentation provides a comprehensive overview of all calculations and methodologies used in the Users & Profiles analytics dashboard, ensuring transparency and reproducibility of all metrics. 