<template>
  <div>
    <!-- v-model裡的newTodo與data裡的newTodo是一樣的 -->
    <input type="text" v-model="newTodo" @keyup.enter="emitAddTodo" placeholder="新增待辦事項" />
    <button @click="emitAddTodo">添加</button>
  </div>
</template>

<script>
export default {
  // 通常 data裡面都是放初始值
  // 從 data 到 <input>：當 data 函數中的 newTodo 屬性的值變化時，這個變化會反映到綁定了 v-model 的 <input> 元素中，即 newTodo 的值會自動顯示在輸入框中。
  // 從 <input> 到 data：當用戶在輸入框中輸入文字時，<input> 元素的值將會更新 newTodo 屬性的值。這意味著您可以在 Vue 實例的其他部分（例如在 methods 中）訪問和使用這個最新的值。
  data() {
    return {
      newTodo: "",
    };
  },
  methods: {
    emitAddTodo() {
      // 獲取 newTodo 屬性的值，並移除其兩端的任何空白字符，這樣就可以確保添加到待辦事項列表中的內容不會以不必要的空格開始或結束。
      // 假如移除空格後還有值
      if (this.newTodo.trim()) {
        // 將項目放到todos
        // 發射一個自定義事件，將新待辦事項的文本作為參數
        this.$emit('add-todo', this.newTodo.trim());
        // this.todos.push(this.newTodo.trim());
        // 清空 newTodo 屬性的值
        this.newTodo = "";
      } else {
        alert("請輸入待辦事項");
      }
    },
  },
};
</script>
