# Communities Page Calculations

This document explains all the calculations and metrics used in the Communities dashboard page.

## Community Health Score

**Formula**: `(Active Members / Total Members) * 0.4 + (Events This Month / 30) * 0.3 + (Profile Completion Rate) * 0.3`

**Components**:
- **Active Members Ratio (40% weight)**: Percentage of members who have been active in the last 30 days
- **Event Activity (30% weight)**: Number of events this month normalized to daily average (capped at 1.0)
- **Profile Completion Rate (30% weight)**: Percentage of members with completed profiles

**Example**:
```
Tech Innovators Community:
- Active Members: 876 / 1245 = 0.703 (70.3%)
- Events This Month: 24 / 30 = 0.8 (normalized daily average)
- Profile Completion: 0.89 (89%)

Health Score = (0.703 * 0.4) + (0.8 * 0.3) + (0.89 * 0.3) = 0.87 = 87%
```

**Health Score Thresholds**:
- **Excellent (80-100)**: Green - Community is thriving with high engagement
- **Good (60-79)**: Amber - Community is healthy with room for improvement  
- **Needs Attention (40-59)**: Red - Community requires intervention
- **Critical (0-39)**: Dark Red - Community is at risk and needs immediate action

## Historical Data Comparison

**New Approach**: All trend indicators now compare **yesterday's data vs. 2 days ago** for more meaningful day-to-day tracking.

**Why This Change**:
- Provides actual daily snapshots instead of current vs. previous period
- Removes the "live calculation" factor that could skew comparisons
- Allows for more accurate trend analysis and pattern recognition
- Better aligns with how community managers track daily progress

**Implementation**:
- **Yesterday (Day -1)**: Complete 24-hour snapshot of all metrics
- **2 Days Ago (Day -2)**: Reference point for comparison
- **Trend Calculation**: `(Yesterday Value - 2 Days Ago Value) / 2 Days Ago Value * 100`

## Member Segmentation Calculation

**Segments Based on Engagement Patterns**:

### Contributors (Target: ~30%)
**Criteria**:
- Created content (posts, events) in last 30 days
- Received engagement on their content
- Initiated discussions or responded meaningfully
- Profile completion > 80%

### Engaged (Target: ~25%)
**Criteria**:
- Regular participation in discussions (comments, reactions)
- Attended events in last 30 days
- Active profile with recent updates
- Moderate content sharing/creation

### Browsers (Target: ~20%)
**Criteria**:
- Regular login activity but limited posting
- Consume content (views, reads) without much interaction
- Occasional comments or reactions
- Incomplete profile completion (50-80%)

### Connectors (Target: ~15%)
**Criteria**:
- High networking activity (follows, connections)
- Cross-community participation
- Event attendance without content creation
- Focus on relationship building over content

### Observers (Target: ~10%)
**Criteria**:
- Minimal activity (login only)
- Rarely engage with content
- Incomplete profiles (<50% completion)
- Long periods of inactivity

**Segment Calculation Process**:
1. **Data Collection**: Aggregate 30-day activity patterns per member
2. **Scoring Algorithm**: Weight different activities (posting=5, commenting=3, viewing=1, etc.)
3. **Threshold Classification**: Assign members to segments based on total activity score
4. **Historical Tracking**: Compare daily segment distributions for trend analysis

## Growth Rate Calculation

**Formula**: `((Yesterday Members - 2 Days Ago Members) / 2 Days Ago Members) * 100`

**Period**: Daily comparison (yesterday vs 2 days ago)

**Example**:
```
Tech Innovators:
- Yesterday: 1245 members
- 2 Days Ago: 1238 members
- Daily Growth Rate = ((1245 - 1238) / 1238) * 100 = 0.57%
```

## Active Members Definition

**Active Member Criteria**:
- Logged in within the last 30 days
- OR posted/commented within the last 30 days  
- OR attended an event within the last 30 days
- OR engaged with community content (likes, shares) within the last 30 days

## Engagement Rate Calculation

**Formula**: `(Total Engagements / Total Members) * 100`

**Engagements Include**:
- Posts created
- Comments made
- Events attended
- Content likes/reactions
- Profile interactions

**Time Period**: Last 30 days

## Community Metrics Breakdown

### Members
- **Total Members**: All users who have joined the community
- **Active Members**: Members meeting the active criteria above
- **New Members**: Members who joined in the current month

### Events
- **Events This Month**: Number of events created/hosted in the current calendar month
- **Average Attendance**: Total attendees across all events / Number of events
- **Event Engagement**: (Event Attendees / Total Members) * 100

### Profile Completion Rate
**Formula**: `(Members with Complete Profiles / Total Members) * 100`

**Complete Profile Criteria**:
- Profile photo uploaded
- Bio/description filled
- At least 3 profile fields completed
- Email verified
- At least one skill/interest added

## Data Sources

### Primary Data Sources
- **User Activity Logs**: Login times, content interactions, event attendance
- **Community Membership Database**: Join dates, member status, profile completion
- **Event Management System**: Event creation, attendance tracking
- **Content Management System**: Posts, comments, reactions

### Data Refresh Frequency
- **Real-time**: User activity, event attendance
- **Hourly**: Engagement calculations, active member counts
- **Daily**: Health scores, growth rates, segment distributions
- **Historical Snapshots**: Captured at midnight UTC for day-over-day comparisons

## Algorithm Weights Rationale

### Health Score Weights
- **Active Members (40%)**: Most important indicator of community vitality
- **Event Activity (30%)**: Shows community programming and engagement
- **Profile Completion (30%)**: Indicates member investment and onboarding success

### Why These Weights?
1. **Active Members**: Direct measure of community engagement and retention
2. **Events**: Communities with regular events show stronger member connections
3. **Profile Completion**: Higher completion rates correlate with longer member retention

### Segment Distribution Weights
- **Content Creation (Weight: 5)**: Highest value activity
- **Event Participation (Weight: 4)**: Strong community engagement
- **Discussion Participation (Weight: 3)**: Active community contribution
- **Content Consumption (Weight: 2)**: Passive but valuable engagement
- **Profile Activity (Weight: 1)**: Basic platform interaction

## Calculation Updates

### Version History
- **v1.0** (Initial): Simple active/total ratio
- **v1.1**: Multi-factor health score with weighted components
- **v1.2** (Current): Historical daily comparison (yesterday vs 2 days ago)
- **v1.3** (Planned): Real-time segment migration tracking

### Recent Changes in v1.2
- **Historical Comparison**: Changed from "current vs previous period" to "yesterday vs 2 days ago"
- **Daily Snapshots**: Implemented midnight UTC data captures for consistent comparisons
- **Segment Tracking**: Added historical trend analysis for member segment movement
- **Enhanced Tooltips**: Dark theme tooltips with historical context

### Upcoming Enhancements
- **Segment Migration Analysis**: Track how members move between segments over time
- **Predictive Health Scores**: ML-based forecasting of community health trends
- **Cross-Community Insights**: Analyze how members behave across multiple communities

## Data Privacy & Compliance

### Data Aggregation
- All calculations use aggregated, anonymized data
- Individual user behavior is not stored or tracked beyond 90 days
- Compliance with GDPR and CCPA privacy requirements

### Data Retention
- **Raw Activity Data**: 90 days
- **Daily Snapshots**: 365 days (for historical trends)
- **Aggregated Metrics**: 2 years
- **Historical Trends**: 5 years (anonymized)

## API Endpoints for Calculations

### Community Health Score
```
GET /api/communities/{id}/health-score
Response: { 
  score: number, 
  components: object, 
  historical: { yesterday: number, twoDaysAgo: number },
  lastUpdated: string 
}
```

### Member Segments
```
GET /api/communities/{id}/segments
Response: { 
  segments: SegmentData[], 
  historical: { yesterday: SegmentData[], twoDaysAgo: SegmentData[] },
  insights: object 
}
```

### Growth Metrics
```
GET /api/communities/{id}/growth
Response: { 
  dailyGrowth: number, 
  yesterdayMembers: number, 
  twoDaysAgoMembers: number,
  trend: string 
}
```

## Troubleshooting Common Issues

### Health Score Discrepancies
- **Check**: Data refresh timing (daily snapshots at midnight UTC)
- **Verify**: All activity logs are captured in 24-hour windows
- **Confirm**: Historical data points are properly stored

### Segment Distribution Anomalies
- **Review**: Member activity scoring thresholds
- **Validate**: Cross-segment migration patterns look realistic
- **Check**: Daily variance stays within expected ranges (±2%)

### Historical Data Issues
- **Ensure**: Daily snapshots are being captured consistently
- **Verify**: No missing data points in historical comparisons
- **Validate**: Time zone consistency (all data in UTC)

### Performance Optimization
- **Caching**: Daily snapshots cached for 24 hours
- **Indexing**: Database indexes on activity timestamps and member IDs
- **Batch Processing**: Historical calculations run during off-peak hours
- **Data Compression**: Older historical data compressed to save storage 