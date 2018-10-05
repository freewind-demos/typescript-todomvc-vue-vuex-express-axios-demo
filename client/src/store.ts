import Axios from 'axios';
import Vuex, {CommitOptions, Store, ActionContext, DispatchOptions} from 'vuex'
import Vue from 'vue'
import {SecondArgument} from '@/type-helpers';

Vue.use(Vuex);

const axios = Axios.create({
//  baseURL: 'http://localhost:3000'
});

export type TodoItem = {
  content: string,
  completed: boolean,
}

export type State = {
  todos: TodoItem[],
  reloadTrigger: number
}

const state = {
  todos: [],
  reloadTrigger: 0
};

const mutations = {
  init(state: State, todos: TodoItem[]) {
    state.todos = todos;
  },
  removeTodo(state: State, index: number) {
    state.todos.splice(index, 1)
  },
  addTodo(state: State, todo: TodoItem) {
    state.todos.push(todo)
  },
  updateTodo(state: State, payload: {index: number, newTodo: TodoItem}) {
    state.todos.splice(payload.index, 1, payload.newTodo)
  },
  reload(state: State) {
    state.reloadTrigger += 1
  }
};

const actions = {
  async fetchTodos(context: MyStore) {
    const todos = await axios.get('/todos');
    context.commit('init', todos.data)
  },
  async removeTodo(context: MyStore, index: number) {
    await axios.delete(`/todos/${index}`)
    context.commit('removeTodo', index);
  },
  async addTodo(context: MyStore, todo: TodoItem) {
    await axios.post('/todos', todo);
    context.commit('addTodo', todo);
  },
  async updateTodo(context: MyStore, payload: {index: number, newTodo: TodoItem}) {
    const {index, newTodo} = payload
    try {
      await axios.put(`/todos/${index}`, newTodo);
      context.commit('updateTodo', payload);
    } catch (e) {
      console.error(e);
      context.commit('reload', undefined)
    }
  },
  async clearCompleted(context: MyStore) {
    const completed = context.state.todos.map((item, index) => ({item, index}))
        .filter(({item}) => item.completed);
    const deletes = completed.map(async ({index}) => await actions.removeTodo(context, index));
    return await Promise.all(deletes)
  },
  async toggleAll(context: MyStore) {
    const todos = context.state.todos;
    if (todos.every(it => it.completed)) {
      return await Promise.all(
          todos.map(async (item, index) => await actions.toggleTodo(context, index))
      );
    } else {
      const ops = todos.map((item, index) => ({item, index}))
          .filter(({item}) => !item.completed)
          .map(async ({index}) => await actions.toggleTodo(context, index));
      return await Promise.all(ops);
    }
  },
  async toggleTodo(context: MyStore, index: number) {
    const newTodo = {...context.state.todos[index]};
    newTodo.completed = !newTodo.completed;
    return await actions.updateTodo(context, {index, newTodo})
  }
};

const getters = {
  todos(state: State) {
    return state.todos;
  }
};

type MutationsType = typeof mutations
type GettersType = typeof getters
type ActionsType = typeof actions

const store = new Store({
  strict: true,
  state,
  getters,
  mutations,
  actions
});

export default store;

export interface MyStore {

  commit<K extends keyof MutationsType>(type: K, payload: SecondArgument<MutationsType[K]>, options?: CommitOptions): void

  dispatch<K extends keyof ActionsType>(type: K, payload: SecondArgument<ActionsType[K]>, options?: DispatchOptions): ReturnType<ActionsType[K]>;

  getters: {
    [K in keyof GettersType]: ReturnType<GettersType[K]>
  }

  state: State
}
