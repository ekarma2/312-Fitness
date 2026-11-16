-- Table of workout types
INSERT INTO workout_plans (name, goal, workout_type, difficulty, equipment, description) VALUES
('Beginner Fat Burn', 'weight_loss', 'cardio', 'beginner', 'none',
 'Walking, light cardio, and bodyweight circuits to build a steady calorie burn.'),
('Beginner Muscle Builder', 'muscle_gain', 'strength', 'beginner', 'dumbbells',
 'Three dumbbell strength days with rest in between so muscles can grow.'),
('Gentle Recovery Week', 'recovery', 'yoga', 'beginner', 'none',
 'Easy yoga, stretching, and walks to help the body recover and stay loose.');


-- 1.) Fat Burn
INSERT INTO plan_days (plan_id, day_number, exercise, minutes, is_rest_day) VALUES
(1, 0, 'Brisk walk or light jog', 30, FALSE),
(1, 1, 'Bodyweight circuit (squats, push-ups, planks)', 25, FALSE),
(1, 2, 'Rest day', 0, TRUE),
(1, 3, 'Cycling or fast walk', 35, FALSE),
(1, 4, 'Bodyweight circuit (lunges, mountain climbers, planks)', 25, FALSE),
(1, 5, 'Long walk outdoors', 45, FALSE),
(1, 6, 'Rest day', 0, TRUE);

-- 2.) Muscle Builder
INSERT INTO plan_days (plan_id, day_number, exercise, minutes, is_rest_day) VALUES
(2, 0, 'Upper body: dumbbell press, rows, curls', 45, FALSE),
(2, 1, 'Rest day', 0, TRUE),
(2, 2, 'Lower body: squats, lunges, deadlifts', 45, FALSE),
(2, 3, 'Rest day', 0, TRUE),
(2, 4, 'Full body dumbbell circuit', 40, FALSE),
(2, 5, 'Light walk', 20, FALSE),
(2, 6, 'Rest day', 0, TRUE);

-- Plan 3: Recovery Week
INSERT INTO plan_days (plan_id, day_number, exercise, minutes, is_rest_day) VALUES
(3, 0, 'Gentle yoga flow', 20, FALSE),
(3, 1, 'Easy walk', 20, FALSE),
(3, 2, 'Rest day', 0, TRUE),
(3, 3, 'Stretching and mobility', 20, FALSE),
(3, 4, 'Gentle yoga flow', 20, FALSE),
(3, 5, 'Easy walk', 30, FALSE),
(3, 6, 'Rest day', 0, TRUE);
