const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let interviews = [];

// Get all
router.get('/', (req, res) => {
  res.json(interviews);
});

// Create
router.post('/', (req, res) => {
  const { title, start, end } = req.body;
  const interview = { id: uuidv4(), title, start, end };
  interviews.push(interview);
  res.status(201).json(interview);
});

// Delete
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  interviews = interviews.filter(i => i.id !== id);
  res.status(204).end();
});

module.exports = router;
