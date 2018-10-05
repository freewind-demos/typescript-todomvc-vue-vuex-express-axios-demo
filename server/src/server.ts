import express from 'express'
import todos from './routes/todos'
import store from './store';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static('../client/dist/'));

app.use('/todos', todos);

app.listen(3000, () => {
  store.init();
  console.log('listen on http://localhost:3000');
});

