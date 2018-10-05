import express from 'express'
import todos from './routes/todos'
import store from './store';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.use('/todos', todos);

app.listen(3000, () => {
  store.init();
  console.log('listen on http://localhost:3000');
});

