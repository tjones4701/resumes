CREATE DATABASE IF NOT EXISTS ai_prototypes;

USE ai_prototypes;

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSON,
  prompt_tokens INT NOT NULL,
  completion_tokens INT NOT NULL,
  total_tokens INT NOT NULL
);