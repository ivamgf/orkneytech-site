CREATE TABLE rate_limit_hits (
  id INTEGER PRIMARY KEY,
  key TEXT NOT NULL,
  hit_at INTEGER NOT NULL
);

CREATE INDEX idx_rate_limit_hits_key_time ON rate_limit_hits (key, hit_at);
