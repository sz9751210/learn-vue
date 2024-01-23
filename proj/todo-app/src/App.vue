<template>
<div id="app">
    <h1>ToDo</h1>
      <!-- v-model裡的newTodo與data裡的newTodo是一樣的 -->
      <el-input style="width: 50%;" maxlength="10" show-word-limit type="text" v-model="newTodo" @keyup.enter="addTodo">
        <template #prepend>Todo</template>
      </el-input>

    <el-button type="primary" @click="addTodo" plain>添加</el-button>
    <ul>
        <li v-for="(todo, index) in todos" :key="index">
            {{ todo }}
            <el-button type="info" @click="removeTodo(index)">刪除</el-button>
        </li>
    </ul>
</div>

</template>

<script>
import { ElButton } from 'element-plus'
export default {
  components: {
    ElButton
  },
    // 通常 data裡面都是放初始值
    // 從 data 到 <input>：當 data 函數中的 newTodo 屬性的值變化時，這個變化會反映到綁定了 v-model 的 <input> 元素中，即 newTodo 的值會自動顯示在輸入框中。
    // 從 <input> 到 data：當用戶在輸入框中輸入文字時，<input> 元素的值將會更新 newTodo 屬性的值。這意味著您可以在 Vue 實例的其他部分（例如在 methods 中）訪問和使用這個最新的值。
    data() {
        return {
            newTodo: '',
            todos: [
                // {text: '吃飯', done: false},
                // {text: '睡覺', done: false},
        ]
        }
    },
    methods: {
        addTodo() {
            // 獲取 newTodo 屬性的值，並移除其兩端的任何空白字符，這樣就可以確保添加到待辦事項列表中的內容不會以不必要的空格開始或結束。
            // 假如移除空格後還有值
            if(this.newTodo.trim()){
                // 將項目放到todos
                this.todos.push(this.newTodo.trim())
                // 清空 newTodo 屬性的值
                this.newTodo = ''
            }
        },
        removeTodo(index) {
            this.todos.splice(index, 1)
        }
    }
};
</script>

<!-- 
註解的使用：您在代碼中加入了清晰的註解，這有助於其他開發者（或未來的您）理解代碼的意圖和功能。

防止空白待辦事項的添加：您已經通過 trim() 和檢查空字符串來處理空白待辦事項的問題，這是一個很好的實踐。

鍵值的綁定：在 v-for 指令中使用 index 作為 key 是可行的，但在某些情況下（如列表項目可以重新排序時），使用唯一的識別符（如 id）作為 key 會更好，因為這可以提高重新渲染的效率。
-->