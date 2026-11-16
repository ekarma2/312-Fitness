CREATE TABLE IF NOT EXISTS workout_plans
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,(goal IN ('weight_loss', 'muscle_gain', 'recovery')),
  workout_type VARCHAR(15) NOT NULL,
  difficulty VARCHAR(15) NOT NULL,
  equipment VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS plan_days
  plan_id INTEGER NOT NULL REFERENCES workout_plans(id),
  day_number INTEGER NOT NULL CHECK (day_number BETWEEN 0 AND 6),
  exercise VARCHAR(100) NOT NULL,
  minutes INTEGER NOT NULL CHECK (minutes >= 0),
  is_rest_day BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (plan_id, day_number)
);

