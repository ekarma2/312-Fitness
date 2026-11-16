const express = require('express');
const pool = require('../db');
const router = express.Router();

// Get all plans 
router.get('/', async (req, res) => {
  const { goal } = req.query;

  try {
    if (goal) {
      const { rows } = await pool.query(
        'SELECT * FROM workout_plans WHERE goal = $1 ORDER BY id',
        [goal]
      );
      return res.json(rows);
    }

    const { rows } = await pool.query('SELECT * FROM workout_plans ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// get a workout plan with each of its days
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'id must be a number' });
  }

  try {
    const plan = await pool.query('SELECT * FROM workout_plans WHERE id = $1', [id]);
    if (plan.rows.length === 0) {
      return res.status(404).json({ error: 'Workout plan not found' });
    }

    const days = await pool.query(
      `SELECT day_number, exercise, minutes, is_rest_day
         FROM plan_days
        WHERE plan_id = $1
        ORDER BY day_number`,
      [id]
    );

    res.json({ ...plan.rows[0], days: days.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;