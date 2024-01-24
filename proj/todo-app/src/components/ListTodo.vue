<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      {{ todo }}
    <button @click="emitRemoveTodo(index)">刪除</button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    todos: Array,
  },
  //   // 定義一個組件可以向其父組件發送的自定義事件。這是一種子組件與父組件通信的方式，尤其是當子組件需要通知父組件某些事情發生時。
  //   emits: ["remove"],
  methods: {
    emitRemoveTodo(index) {
      this.$emit("remove-todo", index);
    },
  },
};
</script>
