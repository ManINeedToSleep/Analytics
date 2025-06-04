### Users Table
\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_active_at TIMESTAMP,
  profile_completed BOOLEAN DEFAULT FALSE,
  account_status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  subscription_status ENUM('free', 'trial', 'paid', 'cancelled') DEFAULT 'free',
  trial_started_at TIMESTAMP,
  trial_ends_at TIMESTAMP,
  subscription_started_at TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_last_active ON users(last_active_at);
CREATE INDEX idx_users_subscription_status ON users(subscription_status);
CREATE INDEX idx_users_created_at ON users(created_at);
\`\`\`

### Communities Table
\`\`\`sql
CREATE TABLE communities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  creator_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity_at TIMESTAMP,
  member_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- Indexes
CREATE INDEX idx_communities_last_activity ON communities(last_activity_at);
CREATE INDEX idx_communities_creator ON communities(creator_id);
\`\`\`

### Events Table
\`\`\`sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  community_id INTEGER REFERENCES communities(id),
  creator_id INTEGER REFERENCES users(id),
  event_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  status ENUM('draft', 'published', 'cancelled', 'completed') DEFAULT 'draft'
);

-- Indexes
CREATE INDEX idx_events_event_date ON events(event_date);
CREATE INDEX idx_events_community ON events(community_id);
CREATE INDEX idx_events_creator ON events(creator_id);
\`\`\`

### Posts Table
\`\`\`sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content TEXT NOT NULL,
  author_id INTEGER REFERENCES users(id),
  community_id INTEGER REFERENCES communities(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE
);

-- Indexes
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_community ON posts(community_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);
\`\`\`

### Comments Table
\`\`\`sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  author_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  parent_comment_id INTEGER REFERENCES comments(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  likes_count INTEGER DEFAULT 0
);

-- Indexes
CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_author ON comments(author_id);
\`\`\`

### Subscriptions Table
\`\`\`sql
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  plan_type ENUM('basic', 'premium', 'enterprise') NOT NULL,
  status ENUM('active', 'cancelled', 'past_due', 'unpaid') DEFAULT 'active',
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  billing_cycle ENUM('monthly', 'yearly') DEFAULT 'monthly',
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ends_at TIMESTAMP,
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_started_at ON subscriptions(started_at);
\`\`\`

### User Activity Table
\`\`\`sql
CREATE TABLE user_activities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  activity_type ENUM('login', 'post_created', 'comment_added', 'event_joined', 'profile_updated', 'community_joined') NOT NULL,
  entity_type ENUM('user', 'post', 'comment', 'event', 'community'),
  entity_id INTEGER,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_user_activities_user ON user_activities(user_id);
CREATE INDEX idx_user_activities_type ON user_activities(activity_type);
CREATE INDEX idx_user_activities_created_at ON user_activities(created_at);
\`\`\`

## 📈 Metric Calculations

### Core Platform Metrics

#### Total Users
\`\`\`sql
SELECT COUNT(*) as total_users 
FROM users 
WHERE account_status = 'active';
\`\`\`

#### Active Communities
\`\`\`sql
SELECT COUNT(*) as active_communities 
FROM communities 
WHERE is_active = true 
AND last_activity_at >= NOW() - INTERVAL '30 days';
\`\`\`

#### Profile Completions
\`\`\`sql
SELECT COUNT(*) as profile_completions 
FROM users 
WHERE profile_completed = true 
AND account_status = 'active';
\`\`\`

#### Monthly Events
\`\`\`sql
SELECT COUNT(*) as monthly_events 
FROM events 
WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE) 
AND status IN ('published', 'completed');
\`\`\`

### Engagement Metrics

#### Daily Active Users (DAU)
\`\`\`sql
SELECT COUNT(DISTINCT user_id) as daily_active_users 
FROM user_activities 
WHERE created_at >= CURRENT_DATE - INTERVAL '1 day';
\`\`\`

#### Weekly Growth Rate
\`\`\`sql
WITH current_week AS (
  SELECT COUNT(*) as current_users 
  FROM users 
  WHERE created_at >= DATE_TRUNC('week', CURRENT_DATE)
),
previous_week AS (
  SELECT COUNT(*) as previous_users 
  FROM users 
  WHERE created_at >= DATE_TRUNC('week', CURRENT_DATE) - INTERVAL '1 week'
  AND created_at < DATE_TRUNC('week', CURRENT_DATE)
)
SELECT 
  CASE 
    WHEN previous_users = 0 THEN 0 
    ELSE ((current_users - previous_users) * 100.0 / previous_users) 
  END as weekly_growth_rate
FROM current_week, previous_week;
\`\`\`

#### Content Created (Monthly)
\`\`\`sql
SELECT 
  (SELECT COUNT(*) FROM posts WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)) +
  (SELECT COUNT(*) FROM events WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)) +
  (SELECT COUNT(*) FROM comments WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE))
as content_created;
\`\`\`

### Business Metrics

#### Free Trial Users
\`\`\`sql
SELECT COUNT(*) as free_trial_users 
FROM users 
WHERE subscription_status = 'trial' 
AND trial_ends_at > NOW();
\`\`\`

#### Trial Conversion Rate
\`\`\`sql
WITH trial_conversions AS (
  SELECT 
    COUNT(CASE WHEN subscription_status = 'paid' THEN 1 END) as converted,
    COUNT(*) as total_trials
  FROM users 
  WHERE trial_started_at IS NOT NULL 
  AND trial_started_at >= NOW() - INTERVAL '90 days'
)
SELECT 
  CASE 
    WHEN total_trials = 0 THEN 0 
    ELSE (converted * 100.0 / total_trials) 
  END as conversion_rate
FROM trial_conversions;
\`\`\`

#### Monthly Recurring Revenue (MRR)
\`\`\`sql
SELECT 
  SUM(
    CASE 
      WHEN billing_cycle = 'monthly' THEN amount
      WHEN billing_cycle = 'yearly' THEN amount / 12
      ELSE 0
    END
  ) as monthly_recurring_revenue
FROM subscriptions 
WHERE status = 'active';
\`\`\`

### Platform Health Metrics

#### System Uptime
\`\`\`sql
-- This would typically come from your monitoring system
-- Example calculation based on downtime incidents
WITH downtime AS (
  SELECT 
    COALESCE(SUM(EXTRACT(EPOCH FROM (resolved_at - created_at))), 0) as total_downtime_seconds
  FROM system_incidents 
  WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)
  AND status = 'resolved'
),
total_time AS (
  SELECT EXTRACT(EPOCH FROM (NOW() - DATE_TRUNC('month', CURRENT_DATE))) as total_seconds
)
SELECT 
  ((total_seconds - total_downtime_seconds) / total_seconds * 100) as uptime_percentage
FROM downtime, total_time;
\`\`\`