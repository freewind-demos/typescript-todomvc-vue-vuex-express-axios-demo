<template>
  <section class="todoapp" v-bind:reloadTrigger="reloadTrigger">
    <header class="header">
      <h1>todos</h1>
      <input autofocus="autofocus" autocomplete="off" placeholder="What needs to be done?" class="new-todo" @keyup.enter="createTodo" v-model="newTodo">
    </header>
    <section class="main" style="">
      <input id="toggle-all" type="checkbox" class="toggle-all" @click="toggleAll">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list" v-for="(todo, index) in filteredTodos">
        <li class="todo" v-bind:class="{completed:todo.completed, editing: todo === editingTodo}" @dblclick="editTodo(todo)">
          <div class="view">
            <input type="checkbox" class="toggle" v-bind:checked="todo.completed" @change="toggleTodo(index)">
            <label>{{todo.content}}</label>
            <button class="destroy" @click="removeTodo(index)"></button>
          </div>
          <input type="text" class="edit" v-model="editingContent" @keyup.enter="doneEdit(index)" @blur="doneEdit(index)" @keyup.esc="cancelEdit()">
        </li>
      </ul>
    </section>
    <footer class="footer" style="">
      <span class="todo-count"><strong>{{itemsLeft}}</strong> items left</span>
      <ul class="filters">
        <li v-for="filter in filters">
          <a v-bind:href="filter.href" v-bind:class="{selected: filter === currentFilter}">{{filter.title}}</a>
        </li>
      </ul>
      <button class="clear-completed" @click="clearCompleted">Clear completed</button>
    </footer>
  </section>
</template>

<script lang="ts">
  import Component from 'vue-class-component';
  import _TodoMvc from './_TodoMvc'

  @Component({})
  export default class extends _TodoMvc {
  }
</script>

<style scoped>
</style>
