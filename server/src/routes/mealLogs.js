const express = require('express');
const pool = require('../db');

const router = express.Router();

// GET /api/meal-logs?user_id=1
router.get('/', async (req, res) => 
    {
  const { user_id } = req.query;
  if (!user_id) return res.status(400).json({ error: 'user_id is required' });

  try {
    const { rows } = await pool.query
    (
      'SELECT * FROM meal_logs WHERE user_id = $1 ORDER BY logged_on DESC, id DESC',
      [user_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/meal-logs
router.post('/', async (req, res) => 
  {
  const { user_id, meal_name, calories, protein_g, logged_on } = req.body;
  if (!user_id || !meal_name) 
  {
    return res.status(400).json({ error: 'user_id and meal_name are required' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO meal_logs (user_id, meal_name, calories, protein_g, logged_on)
       VALUES ($1, $2, $3, $4, COALESCE($5, CURRENT_DATE))
       RETURNING *`,
      [user_id, meal_name, calories, protein_g, logged_on]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT 
router.put('/:id', async (req, res) => 
  {
  const id = Number(req.params.id);
  const { user_id, logged_on, meal_name, calories, protein_g } = req.body;

  if (!Number.isInteger(id) || !user_id || !meal_name) {
    return res.status(400).json({ error: 'id, user_id and meal_name are required' });
  }

  try {
    const { rows } = await pool.query(
      `UPDATE meal_logs
          SET logged_on = COALESCE($1, logged_on),
              meal_name = $2,
              calories  = $3,
              protein_g = $4
        WHERE id = $5 AND user_id = $6
        RETURNING *`,
      [logged_on, meal_name, calories, protein_g, id, user_id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Meal log not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE 
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { user_id } = req.query;

  if (!Number.isInteger(id) || !user_id) {
    return res.status(400).json({ error: 'id and user_id are required' });
  }

  try {
    const { rowCount } = await pool.query(
      'DELETE FROM meal_logs WHERE id = $1 AND user_id = $2',
      [id, user_id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Meal log not found' });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;