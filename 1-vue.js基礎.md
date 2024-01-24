## vue.js核心是什麼?
響應式系統。當更改應用數據時，介面會自動更新以反映這些更改。使構建動態用戶介面變得容易。

## 如何創建一個Vue實例?
創建Vue實例的最簡單方式是使用Vue.js的全局函數Vue。
```
var vm = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})
```
代碼意思為建立一個vue實例，並將其綁定到id為app的DOM元素上。
並定義一個data屬性，如`message`，當數據改變時，與之綁定的介面也會更新。

## 如何在Vue中綁定數據?
Vue使用了與 Jinja2相似的方式，都使用雙大括號{{}}來表示數據。
```
<div id="app">
    {{ message }}
</div>
```
代碼意思為將數據message綁定到id為app的DOM元素上。
`{{message}}`將會被替換成message的值。

## Vue關鍵指令
### v-bind指令(單向綁定)
`v-bind`指令可以將數據綁定到DOM元素上。例如`v-bind:src`可以將圖片的源文件綁定到img元素上。
```
<img v-bind:src="imageSrc">
```
這裡`imageSrc`是Vue實例中一個數據屬性，當數據改變時，`img`元素的src屬性也會跟著改變。

### v-model指令(雙向綁定)
`v-model`指令創建了一個雙向綁定在表單輸入和Vue實例的數據上。例如，當使用者在輸入框輸入時，數據也會跟著改變。
```
<input v-model="message">
```
在這個例子中，input裡的值會與Vue實例的message數據保持同步。
代表無論在input輸入什麼，Vue實例的message數據都會被更新。
而如果在程式碼中修改了Vue實例的message數據，input也會跟著更新。

### v-on(監聽事件)
`v-on`指令可以監聽DOM元素的事件，同時也用於監聽來自子組件的自定義事件。
簡寫為`@`。
以下兩種寫法屬於相同功能
```
v-on:click="handler"
@click="handler"
```
事件處理器(handler)的值可以分為兩種：
- 內聯事件處理器：事件被觸發時執行的內聯 Js 語法(與 `onclick` 類似)。
- 方法事件處理器：指向組件上定義的方法的屬性名或路徑。

#### 內聯事件處理器
通常用於簡單場景，基本加減乘除等等。
```js
data(){
    return{
        count: 0
    }    
}
```

```template
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

#### 方法事件處理器
通常用於更複雜的場景，例如需要傳遞參數。因此`v-on`也可以接受一個方法名或對某個方法的調用。
```js
data(){
    return{
        name: 'Vue.js'
    }
},
methods: {
    greet(event){
    // 方法中的 this 指向 Vue 實例的 name
    alert(`Hello ${this.name}!`)
    // event 是原生 DOM 事件
    if(event){
        alert(event.target.tagName)
    }
  }
}
```

```template
<!-- greet 是上面定義過的方法名 -->
<button @click="greet">Greet</button>
```

#### 監聽子組件事件
`v-on` 也用於監聽子組件觸發的自定義事件。子組件可以使用 `this.$emit` 方法發射自定義事件，並將數據傳遞給父組件。

```js
// 子組件中
methods: {
  submitForm() {
    // 假設表單數據保存在 formData 中
    this.$emit('form-submitted', this.formData);
  }
}
```

```template
<!-- 父組件中 -->
<child-component @form-submitted="handleFormSubmission"></child-component>
```

在這個例子中，當子組件中的 `submitForm` 方法被調用時，它會發射一個名為 `form-submitted` 的事件，並將表單數據作為參數。父組件使用 `@form-submitted="handleFormSubmission"` 監聽這個事件，當事件發生時，會調用 `handleFormSubmission` 方法來處理收到的數據。這種方式非常適用於子組件向父組件傳遞信息的情況。

#### 發射事件詳細過程

首先，我們有一個 `ListTodo` 組件，它包含一個列表和刪除按鈕：

```vue
<!-- ListTodo.vue -->
<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      {{ item }}
      <button @click="emitRemoveTodo(index)">刪除</button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: Array
  },
  methods: {
    emitRemoveTodo(index) {
      this.$emit('remove-todo', index);
    }
  }
};
</script>
```

在這個組件中，每當點擊刪除按鈕時，`emitRemoveTodo` 方法會被調用，並通過 `this.$emit` 發射一個名為 `remove-todo` 的事件，同時傳遞要刪除的項目索引。

接下來，我們有一個 `App.vue` 組件，它使用了 `ListTodo` 組件：

```vue
<!-- App.vue -->
<template>
  <div>
    <ListTodo :items="todos" @remove-todo="removeTodo" />
  </div>
</template>

<script>
import ListTodo from './ListTodo.vue';

export default {
  components: {
    ListTodo
  },
  data() {
    return {
      todos: ['學習 Vue', '寫代碼', '閱讀文檔']
    };
  },
  methods: {
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
};
</script>
```

在 `App.vue` 中，我們將 `todos` 數組作為 prop 傳遞給 `ListTodo` 組件。此外，我們還使用 `@remove-todo` 監聽從 `ListTodo` 發射的 `remove-todo` 事件。當該事件發生時，會調用 `removeTodo` 方法來刪除對應索引的待辦事項。

1. **在 `ListTodo` 組件的 `template` 中按下刪除按鈕**：
   - 當您在 `ListTodo` 組件的 `template` 中點擊刪除按鈕時，會觸發 `emitRemoveTodo` 方法。
   - 這是因為按鈕元素被設定了一個點擊事件監聽器 `@click="emitRemoveTodo(index)"`。

2. **執行 `emitRemoveTodo` 方法**：
   - 在 `emitRemoveTodo` 方法中，`ListTodo` 組件使用 `this.$emit('remove-todo', index)` 發射（觸發）了一個名為 `remove-todo` 的自定義事件，並且將被點擊的待辦事項的索引（`index`）作為參數。

3. **`App.vue` 組件監聽並響應 `remove-todo` 事件**：
   - 在 `App.vue` 組件中，當使用 `ListTodo` 組件時，透過 `v-on:remove-todo="removeTodo"` 監聽 `remove-todo` 事件。
   - 這表示當 `remove-todo` 事件從 `ListTodo` 組件被發射時，`App.vue` 組件的 `removeTodo` 方法會被調用。

4. **執行 `removeTodo` 方法**：
   - 在 `App.vue` 的 `removeTodo` 方法中，接收到的索引（`index`）用於從 `todos` 數組中移除相應的待辦事項。
   - 這一步完成了待辦事項的刪除操作。

總結來說，當您在 `ListTodo` 組件中點擊刪除按鈕時，會經由一系列的事件傳遞和方法調用，最終在父組件 `App.vue` 中執行刪除該待辦事項的操作。這個過程展示了 Vue.js 中組件間如何通過自定義事件進行有效的通信和數據傳遞。

在 Vue.js 中，使用 `v-on` 來監聽事件時，通常涉及到兩個部分：子組件中使用 `$emit` 發射（emit）事件，以及父組件中使用 `v-on` 監聽這些事件。

1. **子組件中發射事件**：
   - 子組件使用 `this.$emit` 方法來發射一個自定義事件。這個方法的第一個參數是事件的名稱，而後續的參數則是要傳遞給父組件的數據。
   - 例如，子組件中可能會有如下代碼：`this.$emit('update-data', newData)`，這表示子組件發射了一個名為 `update-data` 的事件，並且將 `newData` 作為數據傳遞給父組件。

2. **父組件中監聽事件**：
   - 父組件使用 `v-on` 或其簡寫 `@` 來監聽子組件發射的事件。父組件需要指定一個方法來響應這個事件。
   - 例如，在父組件的模板中，可能會有這樣的代碼：`<ChildComponent @update-data="handleUpdate" />`。這表示當 `ChildComponent` 發射 `update-data` 事件時，父組件將調用 `handleUpdate` 方法來處理這個事件。

通過這種方式，子組件可以將信息或數據傳遞給父組件，而不需要直接操作父組件的狀態，這有助於保持組件之間的解耦和數據流的清晰。這是 Vue.js 中組件間通信的一個重要概念，有助於實現更清晰和可維護的代碼結構。
