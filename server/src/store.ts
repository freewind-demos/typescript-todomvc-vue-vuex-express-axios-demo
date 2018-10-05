export type TodoItem = {
  content: string,
  completed: boolean,
}

class Store {
  todos: TodoItem[] = [];

  init() {
    this.todos = [
      {content: "sdfsf", completed: true},
      {content: "wefsdf", completed: false},
      {content: "2fsdf89", completed: false}
    ]
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1)
  }

  addTodo(todo: TodoItem) {
    this.todos.push(todo)
  }

  updateTodo(index: number, newTodo: TodoItem) {
    this.todos.splice(index, 1, newTodo)
  }

  clearCompleted() {
    this.todos = this.todos.filter(it => !it.completed)
  }

  toggleAll() {
    if (this.todos.every(it => it.completed)) {
      this.todos.forEach(it => it.completed = false)
    } else {
      this.todos.forEach(it => it.completed = true)
    }
  }

  toggleTodo(index: number) {
    this.todos[index].completed = !this.todos[index].completed
  }

}

export default new Store()
