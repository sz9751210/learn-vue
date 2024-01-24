<template>
  <div id="app">
    <h1>ToDo</h1>
    <!-- 監聽add-todo是否被觸發, 如果被觸發執行當前的addTodo方法 -->
    <AddTodo @add-todo="addTodo" />

    <ListTodo :todos="todos" @remove-todo="removeTodo" />
  </div>
</template>
<script>
import AddTodo from "./components/AddTodo.vue";
import ListTodo from "./components/ListTodo.vue";
export default {
  components: {
    AddTodo,
    ListTodo,
  },
  // 通常 data裡面都是放初始值
  // 從 data 到 <input>：當 data 函數中的 newTodo 屬性的值變化時，這個變化會反映到綁定了 v-model 的 <input> 元素中，即 newTodo 的值會自動顯示在輸入框中。
  // 從 <input> 到 data：當用戶在輸入框中輸入文字時，<input> 元素的值將會更新 newTodo 屬性的值。這意味著您可以在 Vue 實例的其他部分（例如在 methods 中）訪問和使用這個最新的值。
  data() {
    return {
      todos: ["吃飯", "睡覺"],
    };
  },
  methods: {
    addTodo(newTodo) {
      this.todos.push(newTodo);
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
  },
};
</script>

<!-- 
註解的使用：您在代碼中加入了清晰的註解，這有助於其他開發者（或未來的您）理解代碼的意圖和功能。

防止空白待辦事項的添加：您已經通過 trim() 和檢查空字符串來處理空白待辦事項的問題，這是一個很好的實踐。

鍵值的綁定：在 v-for 指令中使用 index 作為 key 是可行的，但在某些情況下（如列表項目可以重新排序時），使用唯一的識別符（如 id）作為 key 會更好，因為這可以提高重新渲染的效率。
-->
