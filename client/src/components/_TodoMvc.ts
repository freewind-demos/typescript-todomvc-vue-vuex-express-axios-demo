import {Prop} from 'vue-property-decorator';
import {TodoItem} from '@/store';
import MyVue from '@/MyVue';

type FilterType = {
  path: string,
  href: string,
  title: string,
  default: boolean,
  filter: (todos: TodoItem[]) => TodoItem[]
}

export default class extends MyVue {

  get todos(): TodoItem[] {
    return this.myStore.getters.todos;
  }

  newTodo: string = '';
  editingTodo: TodoItem | null = null;
  editingContent: string | null = null;

  filters: FilterType[] = [
    {
      path: '/all',
      href: '#/all',
      title: 'All',
      default: true,
      filter: todos => todos
    }, {
      path: '/active',
      href: '#/active',
      title: 'Active',
      default: false,
      filter: todos => todos.filter(it => !it.completed)
    }, {
      path: '/completed',
      href: '#/completed',
      title: 'Completed',
      default: false,
      filter: todos => todos.filter(it => it.completed)
    }
  ];

  @Prop() currentPath!: string;

  get currentFilter(): FilterType {
    return this.filters.find(it => it.path === this.currentPath) || this.defaultFilter;
  }

  get defaultFilter(): FilterType {
    return this.filters.find(it => it.default)!
  }

  get filteredTodos(): TodoItem[] {
    return this.currentFilter.filter(this.todos)
  }

  get itemsLeft(): number {
    return this.todos.filter(it => !it.completed).length
  }

  createTodo() {
    this.myStore.commit('addTodo', {
      content: this.newTodo,
      completed: false
    });
    this.newTodo = '';
  }

  removeTodo(index: number) {
    this.myStore.commit('removeTodo', index);
  }

  toggleAll() {
    this.myStore.commit('toggleAll', undefined);
  }

  clearCompleted() {
    this.myStore.commit('clearCompleted', undefined);
  }

  editTodo(todo: TodoItem) {
    this.editingTodo = todo;
    this.editingContent = todo.content;
  }

  doneEdit(index: number) {
    if (this.editingTodo === null) {
      return;
    }
    const newTodo: TodoItem = {...this.editingTodo};
    if (this.editingContent !== null) {
      newTodo.content = this.editingContent.trim()
    }
    this.editingTodo = null;
    this.editingContent = null;
    if (newTodo.content) {
      this.myStore.commit('updateTodo', {index, newTodo: newTodo});
    } else {
      this.myStore.commit('removeTodo', index);
    }
  }

  cancelEdit() {
    this.editingTodo = null;
    this.editingContent = null;
  }

  toggleTodo(index: number) {
    this.myStore.commit('toggleTodo', index)
  }
}
