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

  get todos(): TodoItem[] { return this.myStore.getters.todos }

  get reloadTrigger() { return this.myStore.state.reloadTrigger }

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

  createTodo = async () => {
    this.myStore.dispatch('addTodo', {
      content: this.newTodo,
      completed: false
    });
    this.newTodo = '';
  }

  removeTodo = async (index: number) => {
    await this.myStore.dispatch('removeTodo', index);
  }

  toggleAll = async () => {
    await this.myStore.dispatch('toggleAll', undefined);
  }

  clearCompleted = async () => {
    await this.myStore.dispatch('clearCompleted', undefined);
  }

  editTodo(todo: TodoItem) {
    this.editingTodo = todo;
    this.editingContent = todo.content;
  }

  doneEdit = async (index: number) => {
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
      await this.myStore.dispatch('updateTodo', {index, newTodo: newTodo});
    } else {
      await this.myStore.dispatch('removeTodo', index);
    }
  }

  cancelEdit() {
    this.editingTodo = null;
    this.editingContent = null;
  }

  toggleTodo = async (index: number) => {
    await this.myStore.dispatch('toggleTodo', index)
  }
}
