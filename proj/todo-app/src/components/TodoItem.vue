<template>
  <div>
    <input
      v-if="isEditing"
      v-model="editableTodo"
      @keyup.enter="saveEdit"
      type="text"
    />
    <span v-else @dblclick="editTodo">{{ todo }}</span>
    <!-- 向父組件發送remove-todo事件 -->
    <button @click="$emit('remove-todo')">刪除</button>"
    <button v-if="isEditing" @click="saveEdit">編輯</button>
  </div>
</template>

<script>
export default {
  props: {
    todo: String,
  },
  data() {
    return {
      isEditing: false,
      editableTodo: this.todo,
    };
  },
  methods: {
    editTodo() {
      this.isEditing = true;
    },
    saveEdit() {
      this.isEditing = false;
      this.$emit("edit-todo", this.editableTodo);
    },
  },
};
</script>
