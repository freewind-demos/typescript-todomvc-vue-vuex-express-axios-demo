import express from 'express';
import store from '../store';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(store.todos)
});

router.post('/', (req, res) => {
  const todo = req.body;
  store.addTodo(todo);
  res.sendStatus(204);
});

router.delete('/:index', (req, res) => {
  const index = req.params['index'];
  store.removeTodo(index);
  res.sendStatus(204);
});

router.put('/:index', (req, res) => {
  if (new Date().getTime() % 3 === 0) {
    return res.sendStatus(500)
  }

  const index = req.params['index'];
  const todo = req.body;
  store.updateTodo(index, todo);
  res.sendStatus(204);
});

export default router;
