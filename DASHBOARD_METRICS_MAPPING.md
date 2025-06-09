# Dashboard Metrics Mapping

This document explains how dashboard metrics are calculated and mapped from the Prisma database schema to the analytics dashboard components.

## 🏆 Community Leaderboard

### Data Source
- **Primary Table**: `Communities`
- **Related Tables**: `CommunityConnections`, `EventLink`, `Events`, `EventTag`, `Tags`, `UserProfiles`

### Metrics Calculation

#### Member Count
```typescript
memberCount: community.memberCount
```
- Direct field from `Communities` table
- Represents total registered members

#### Events Created
```typescript
eventsCreated: community.communityEvents.length
```
- Count of related `EventLink` records
- Links communities to events they've created/promoted

#### Engagement Rate
```typescript
const thirtyDaysAgo = subDays(new Date(), 30)
const activeMembers = community.CommunityConnections.filter(
  (conn) => conn.joinDate >= thirtyDaysAgo
).length
const engagement = community.memberCount > 0 
  ? (activeMembers / community.memberCount) * 100 
  : 0
```
- Calculated as: (Active Members in Last 30 Days / Total Members) × 100
- Active members = those who joined in the last 30 days

#### Creator Information
```typescript
creator: {
  id: community.profileCommunities.profileName || community.id,
  name: community.profileCommunities.profileName || 'Unknown Creator',
  avatar: community.profileCommunities.avatar || undefined
}
```
- Retrieved from `UserProfiles` via `profileCommunities` relationship
- Shows who created the community

#### Tags
```typescript
const allTags = community.communityEvents.flatMap(
  (eventLink) => eventLink.event.eventTags.map((et) => et.tags?.name || '')
).filter(Boolean)
const uniqueTags = [...new Set(allTags)]
```
- Extracted from events associated with the community
- Path: `Communities` → `EventLink` → `Events` → `EventTag` → `Tags`
- Deduplicated to show unique tags only

#### Category Classification
```typescript
function getCategoryFromTags(tags: string[]): string | null {
  const categoryMap = {
    'AI': 'Technology',
    'Machine Learning': 'Technology',
    'Web Development': 'Technology',
    'Design': 'Arts & Design',
    'UI/UX': 'Arts & Design',
    'Startup': 'Business',
    'Entrepreneurship': 'Business',
    'Marketing': 'Marketing'
  }
  
  for (const tag of tags) {
    if (categoryMap[tag]) {
      return categoryMap[tag]
    }
  }
  return null
}
```
- Auto-categorizes communities based on their most common tags
- Falls back to `community.communityType` or 'General'

### Removed Fields
- **Growth Rate**: Removed as requested (was calculated from member join trends)
- **Category Filter**: Removed from leaderboard interface

## 🔍 Community Details

### Data Source
- **Primary Table**: `Communities` (single record by ID)
- **Related Tables**: Same as leaderboard + detailed member information

### Additional Metrics

#### Recent Activity (Last Week)
```typescript
const recentActivity = generateRecentActivity(community.CommunityConnections)
```
- Simulated weekly activity data
- Shows member joins, events, and posts over 7 days
- **Note**: Currently uses mock data generation

#### Top Contributing Members (Paginated)
```typescript
const uniqueMembers = new Map()
community.CommunityConnections.forEach((conn) => {
  if (!uniqueMembers.has(conn.profile.id)) {
    uniqueMembers.set(conn.profile.id, {
      id: conn.profile.id,
      name: conn.profile.profileName || 'Unknown',
      avatar: conn.profile.avatar || undefined,
      role: 'Member', // Would determine from role field
      contributions: 0 // Would calculate from activities
    })
  }
})
```
- **Pagination**: 5 members per page
- **Deduplication**: Uses Map to ensure unique members by profile ID
- **Contributions**: Currently mock data (would calculate from actual activities)

#### Popular Tags with Trends
```typescript
const tagCounts = allTags.reduce((acc, tag) => {
  acc[tag.name] = (acc[tag.name] || 0) + 1
  return acc
}, {})

const popularTags = Object.entries(tagCounts)
  .map(([name, count]) => ({
    name,
    count: count as number,
    trend: 0 // Would calculate based on time series
  }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 10)
```
- Shows top 10 most used tags in community
- **Trend Calculation**: Currently placeholder (would compare with previous period)

#### Community Growth Chart
```typescript
// Mock growth data - shows member count progression
const growthData = [
  { date: "Dec 15", members: community.memberCount - 150 },
  { date: "Dec 16", members: community.memberCount - 120 },
  // ... progressive growth to current count
]
```
- **Time Range**: Last week (as requested, changed from "2 days")
- **Data**: Currently simulated growth progression
- **Real Implementation**: Would query `CommunityConnections.joinDate` grouped by day

## 🎯 Key Implementation Notes

### Environment-Controlled Data Sources
```typescript
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true' || !process.env.DATABASE_URL
```
- Automatically falls back to mock data when database unavailable
- Allows development without database connection

### Error Handling Strategy
```typescript
try {
  // Real database query
  const data = await db.communities.findMany(...)
  return data
} catch (error) {
  console.error('Database error:', error)
  return getMockData() // Graceful fallback
}
```
- All functions include try-catch with mock data fallbacks
- Ensures dashboard always displays data

### Tag System Integration
- **Real Tags**: Extracted from actual events and their tag relationships
- **Category Mapping**: Intelligent categorization based on tag content
- **Deduplication**: Ensures unique tags across all community events

### Performance Considerations
- **Pagination**: Implemented for large member lists
- **Selective Queries**: Only fetch required fields and relationships
- **Caching**: Consider implementing for frequently accessed data

## 🔄 Future Enhancements

### Real Activity Tracking
- Implement actual post/comment counting
- Track member engagement metrics
- Calculate real contribution scores

### Advanced Analytics
- Time-series analysis for growth trends
- Engagement pattern recognition
- Predictive analytics for community health

### Database Optimization
- Add indexes for frequently queried fields
- Consider materialized views for complex aggregations
- Implement caching layer for expensive calculations

## 📊 Data Flow Summary

```
Database (Prisma) → Analytics Service → API Routes → React Components
     ↓                    ↓                ↓              ↓
Real/Mock Data → Calculations/Mapping → JSON Response → UI Display
```

This architecture ensures consistent data flow and allows for easy switching between real and mock data during development. 