CREATE TABLE IF NOT EXISTS meal_logs 
(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  logged_on DATE NOT NULL DEFAULT CURRENT_DATE,
  meal_name VARCHAR(100) NOT NULL,
  calories INTEGER CHECK (calories >= 0),
  protein_g NUMERIC(6,1) CHECK (protein_g >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);