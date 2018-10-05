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

}

export default new Store()
