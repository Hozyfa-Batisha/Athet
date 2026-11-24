ALTER TABLE users
  ADD COLUMN role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  ADD COLUMN last_login_at TIMESTAMPTZ,
  ADD COLUMN vip_until TIMESTAMPTZ;

CREATE TABLE visitor_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  visited_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX visitor_events_time ON visitor_events (visited_at);
