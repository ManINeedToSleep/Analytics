# Dashboard Metrics & Data Sources

This document outlines the key metrics displayed on the RYLYTICS dashboard, their definitions, and their primary data sources.

## I. Overview Dashboard Cards (`app/dashboard/page.tsx`)

These are the summary cards typically shown on the main dashboard landing page.

### 1. Metric: Total Users
- **Displayed As:** KPI (e.g., "45,231"), Chart Y-axis label on "Platform Growth"
- **Description on UI:** "Registered platform users" / "Track overall platform growth metrics"
- **Source System:** [ ] Vercel Postgres [ ] Mixpanel [ ] External API [ ] Other:_________
- **If Vercel Postgres:**
    - Relevant Table(s): `users`
    - SQL Query/Logic: `SELECT COUNT(*) FROM users WHERE account_status = 'active';` (Adjust if definition differs, e.g., includes non-active)
- **If Mixpanel:**
    - Event Name(s):
    - Mixpanel Report/Query Logic:
- **Trend Calculation (if applicable for KPI trend, not the chart itself):**
    - Previous Period Definition:
    - SQL/Logic for Previous Period:
- **Notes/Clarifications:**

### 2. Metric: Active Communities
- **Displayed As:** Overview Card
- **Description on UI:** "Communities with recent activity"
- **Source System:** [ ] Vercel Postgres [ ] Mixpanel [ ] External API [ ] Other:_________
- **If Vercel Postgres:**
    - Relevant Table(s): `communities`
    - SQL Query/Logic: `SELECT COUNT(*) FROM communities WHERE is_active = true AND last_activity_at >= NOW() - INTERVAL '30 days';`
- **Trend Calculation:**
    - Previous Period Definition: Last 30-day period prior to the current one.
    - SQL/Logic for Previous Period:
- **Notes/Clarifications:**

### 3. Metric: Profile Completions
- **Displayed As:** Overview Card
- **Description on UI:** "Users with completed profiles"
- **Source System:** [ ] Vercel Postgres [ ] Mixpanel [ ] External API [ ] Other:_________
- **If Vercel Postgres:**
    - Relevant Table(s): `users`
    - SQL Query/Logic: `SELECT COUNT(*) FROM users WHERE profile_completed = true AND account_status = 'active';`
- **Trend Calculation:**
    - Previous Period Definition:
    - SQL/Logic for Previous Period:
- **Notes/Clarifications:**

### 4. Metric: Monthly Events (Scheduled/Platform Events)
- **Displayed As:** Overview Card
- **Description on UI:** "Events created this month"
- **Source System:** [ ] Vercel Postgres [ ] Mixpanel [ ] External API [ ] Other:_________
- **If Vercel Postgres:**
    - Relevant Table(s): `events`
    - SQL Query/Logic: `SELECT COUNT(*) FROM events WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE) AND status IN ('published', 'completed');`
- **Trend Calculation:**
    - Previous Period Definition:
    - SQL/Logic for Previous Period:
- **Notes/Clarifications:**

### 5. Metric: Daily Active Users (DAU)
- **Displayed As:** Overview Card
- **Description on UI:** "Users active in last 24h"
- **Source System:** [ ] Vercel Postgres (`user_activities`) [ ] Mixpanel [ ] Other:_________
- **Definition of "Active":** (e.g., Any event in Mixpanel, specific event types, login, any record in `user_activities`)
- **If Vercel Postgres:**
    - Relevant Table(s): `user_activities`
    - SQL Query/Logic: `SELECT COUNT(DISTINCT user_id) FROM user_activities WHERE created_at >= CURRENT_DATE - INTERVAL '1 day';`
- **If Mixpanel:**
    - Event Name(s) Defining Active: (e.g., "$ Qualquer Evento" or specific events)
    - Mixpanel Report/Query Logic: (e.g., Segmentation report on unique users for defined active events)
- **Trend Calculation:**
    - Previous Period Definition:
    - SQL/Logic for Previous Period:
- **Notes/Clarifications:**

### 6. Metric: Weekly Growth
- **Displayed As:** Overview Card
- **Description on UI:** "Platform growth this week"
- **Definition of "Growth":** [ ] New User Acquisition [ ] Total User Base Growth [ ] Active User Base Growth
- **Source System:** [ ] Vercel Postgres [ ] Mixpanel [ ] Other:_________
- **If Vercel Postgres (New User Acquisition):**
    - Relevant Table(s): `users`
    - SQL Query/Logic: (Use the new user acquisition growth formula from `MockDatabaseSchema.md`)
- **If Vercel Postgres (Total User Base Growth):**
    - Relevant Table(s): `users`
    - SQL Query/Logic: (Use total user base growth formula, comparing total active users week over week)
- **If Mixpanel (Active User Growth):**
    - Event Name(s):
    - Mixpanel Report/Query Logic: (e.g., Trend of WAU)
- **Trend Calculation:** (The metric itself is a trend, but it might have a trend *of the trend*)
    - Previous Period Definition:
    - SQL/Logic for Previous Period:
- **Notes/Clarifications:**

### 7. Metric: Content Created (Monthly)
- **Displayed As:** Overview Card
- **Description on UI:** "Posts, events, and updates"
- **Source System:** [ ] Vercel Postgres
- **If Vercel Postgres:**
    - Relevant Table(s): `posts`, `events`, `comments`
    - SQL Query/Logic: `SELECT (SELECT COUNT(*) FROM posts WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)) + (SELECT COUNT(*) FROM events WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE) AND status IN ('published', 'completed')) + (SELECT COUNT(*) FROM comments WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)) as content_created;`
- **Trend Calculation:**
    - Previous Period Definition:
    - SQL/Logic for Previous Period:
- **Notes/Clarifications:**

### 8. Metric: Platform Health
- **Displayed As:** Overview Card
- **Description on UI:** "System uptime and performance"
- **Source System:** [ ] External Monitoring Tool API [ ] Vercel Platform API [ ] Other:_________
- **If API:**
    - API Endpoint:
    - Key Parameters/Query:
- **Notes/Clarifications:** Typically an uptime percentage.

## II. Platform Growth Chart
- **Card Title:** Platform Growth
- **Description on UI:** Track overall platform growth metrics
- **Chart Type:** Line Chart
- **Primary Metric Displayed:** Historical trend of Total Users (or chosen growth metric)
- **Time Aggregation:** Monthly (Jan, Feb, Mar...)
- **Source System for Time Series Data:** [ ] Vercel Postgres [ ] Mixpanel
- **If Vercel Postgres:**
    - Relevant Table(s): `users`
    - SQL Query/Logic for Time Series: (e.g., `SELECT DATE_TRUNC('month', created_at) as month, COUNT(*) as users FROM users WHERE account_status='active' GROUP BY month ORDER BY month;`)
- **If Mixpanel:**
    - Event Name(s):
    - Mixpanel Report/Query Logic: (e.g., Segmentation report of total users over time)
- **Dropdown Filter:** "Users" (Potentially other metrics like "Active Users")
    - Logic for switching metrics:
- **Notes/Clarifications:** The "Total Users: 45,231" KPI below the chart is the latest value of the primary metric.

## III. User Engagement Chart (Bar Chart)
- **Card Title:** User Engagement
- **Description on UI:** Key user engagement metrics across the platform
- **Chart Type:** Vertical Bar Chart
- **Metrics Displayed (Bars):**
    - Profile Created
    - Account Activated
    - Community Joined
    - Event Participated
    - Profile Scanned
- **For each metric above, define:**
    - **Source System:** [ ] Vercel Postgres [ ] Mixpanel
    - **If Vercel Postgres:**
        - Relevant Table(s):
        - SQL Query/Logic: (e.g., For "Profile Created": `SELECT COUNT(*) FROM users WHERE profile_completed = true AND account_status = 'active';`) (Note: This implies "Profile Created" and "Profile Completions" from overview cards might be the same or similar)
    - **If Mixpanel:**
        - Event Name(s): (e.g., "Profile Updated", "Account Verified", "Community Joined CTA Clicked", "Event RSVP'd", "Profile QR Scanned")
        - Mixpanel Report/Query Logic: (Count of users performing these events in a given period)
- **Notes/Clarifications:** Are these counts over all time, or a specific period (e.g., last 30 days)?

## IV. Platform Conversion Metrics
- **Card Title:** Platform Conversion Metrics
- **Description on UI:** User conversion rates across key platform features
- **Metrics Displayed (Progress Bars):**
    - Profile Completion Rate (Numerator/Denominator)
    - Account Activation Rate (Numerator/Denominator)
    - Community Participation Rate (Numerator/Denominator)
    - Event Participation Rate (Numerator/Denominator)
    - Profile Scanning Adoption (Numerator/Denominator)
- **For each metric above, define:**
    - **Numerator Definition & Source:**
        - Source System: [ ] Vercel Postgres [ ] Mixpanel
        - SQL/Mixpanel Logic:
    - **Denominator Definition & Source:** (Often Total Active Users or Total Users)
        - Source System: [ ] Vercel Postgres [ ] Mixpanel
        - SQL/Mixpanel Logic: (e.g., For denominator `45,231`: `SELECT COUNT(*) FROM users WHERE account_status = 'active';`)
- **Notes/Clarifications:** Numerators might be counts of users who completed a specific action. Denominators seem to be total users for these examples.

## V. Recent Platform Activity
- **Card Title:** Recent Platform Activity
- **Description on UI:** Latest activities across the RYLA platform
- **Source System:** [ ] Vercel Postgres (`user_activities` or specific tables) [ ] Mixpanel (via webhook to backend?)
- **If Vercel Postgres:**
    - Relevant Table(s): `user_activities`, potentially `communities`, `users`, `events` for details.
    - SQL Query/Logic: (e.g., `SELECT activity_type, metadata, created_at FROM user_activities ORDER BY created_at DESC LIMIT 5;` - requires parsing `metadata` to generate human-readable strings)
- **Notes/Clarifications:** Requires a robust way to generate the descriptive strings (e.g., "New community 'AI Enthusiasts' created").

## VI. Member Engagement Chart (Stacked Area Chart)
- **Card Title:** Member Engagement
- **Description on UI:** Track active, engaged, and observer members over time
- **Chart Type:** Stacked Area Chart
- **Member Segments:**
    - Active Members
    - Engaged Members
    - Observers
- **For each segment, define:**
    - **Definition:** (What criteria make a user fall into this segment? e.g., Active = DAU criteria, Engaged = DAU + content creation/interaction, Observer = Logged in but no other significant activity)
    - **Source System for Segmentation & Time Series:** [ ] Vercel Postgres (`user_activities`) [ ] Mixpanel (User Segments / Cohorts)
    - **If Vercel Postgres:**
        - Relevant Table(s): `user_activities`, `users`
        - SQL Query/Logic for Time Series Segmentation: (This will be complex, likely involving window functions or daily/weekly aggregation of user activity patterns)
    - **If Mixpanel:**
        - Event Name(s)/Properties for Segmentation:
        - Mixpanel Report/Query Logic: (e.g., Segmentation or Insights report showing trends of user cohorts)
- **Time Filter:** Dropdown (e.g., "Last 7 days", "Last 30 days", "Last 90 days")
- **Notes/Clarifications:** Hover interactivity to show values for specific points in time is desired.

---

Fill this out with RYLY to get clarity on data sources. This will be the foundation for any backend or frontend work. 