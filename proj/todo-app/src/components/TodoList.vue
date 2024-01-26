<template>
  <div>
    <h1>Todo List</h1>
    <input
      v-model="newTodo"
      @keyup.enter="emitAddTodo"
      placeholder="新增待辦事項"
    />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <template v-if="todo.isEditing">
          <input
            v-model="todo.text"
            @blur="emitFinishEdit(todo)"
            @keyup.enter="emitFinishEdit(todo)"
          />
        </template>
        <template v-else>
          {{ todo.text }}
          <button @click="emitEditTodo(todo)">Edit</button>
          <button @click="emitDeleteTodo(todo.id)">Delete</button>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: "",
      todos: [],
      nextTodoId: 0,
    };
  },
  methods: {
    emitAddTodo() {
      if (this.newTodo.trim() === "") return;
      this.todos.push({
        id: this.nextTodoId++,
        text: this.newTodo,
        isEditing: false,
      });
      this.newTodo = "";
    },
    emitDeleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    },
    emitEditTodo(todo) {
      todo.isEditing = true;
    },
    emitFinishEdit(todo) {
      if (todo.text.trim() === '') {
        this.emitDeleteTodo(todo.id);
      } else {
        todo.isEditing = false;
      }
    },
  },
};
</script>
