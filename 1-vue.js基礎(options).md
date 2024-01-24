## vue.js 核心是什麼?

響應式系統。當更改應用數據時，介面會自動更新以反映這些更改。使構建動態用戶介面變得容易。

## 如何創建一個 Vue 實例?

創建 Vue 實例的最簡單方式是使用 Vue.js 的全局函數 Vue。

```
var vm = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})
```

代碼意思為建立一個 vue 實例，並將其綁定到 id 為 app 的 DOM 元素上。
並定義一個 data 屬性，如`message`，當數據改變時，與之綁定的介面也會更新。

## 如何在 Vue 中綁定數據?

Vue 使用了與 Jinja2 相似的方式，都使用雙大括號{{}}來表示數據。

```
<div id="app">
    {{ message }}
</div>
```

代碼意思為將數據 message 綁定到 id 為 app 的 DOM 元素上。
`{{message}}`將會被替換成 message 的值。

## Vue 關鍵指令

### v-bind 指令(單向綁定)

`v-bind`指令可以將數據綁定到 DOM 元素上。例如`v-bind:src`可以將圖片的源文件綁定到 img 元素上。

```
<img v-bind:src="imageSrc">
```

這裡`imageSrc`是 Vue 實例中一個數據屬性，當數據改變時，`img`元素的 src 屬性也會跟著改變。

### v-model 指令(雙向綁定)

`v-model`指令創建了一個雙向綁定在表單輸入和 Vue 實例的數據上。例如，當使用者在輸入框輸入時，數據也會跟著改變。

```
<input v-model="message">
```

在這個例子中，input 裡的值會與 Vue 實例的 message 數據保持同步。
代表無論在 input 輸入什麼，Vue 實例的 message 數據都會被更新。
而如果在程式碼中修改了 Vue 實例的 message 數據，input 也會跟著更新。

### v-on(監聽事件)

`v-on`指令可以監聽 DOM 元素的事件，同時也用於監聽來自子組件的自定義事件。
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
    items: Array,
  },
  methods: {
    emitRemoveTodo(index) {
      this.$emit("remove-todo", index);
    },
  },
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
import ListTodo from "./ListTodo.vue";

export default {
  components: {
    ListTodo,
  },
  data() {
    return {
      todos: ["學習 Vue", "寫代碼", "閱讀文檔"],
    };
  },
  methods: {
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
  },
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

### v-for

根據 list 遍歷數據，並渲染出每一個數據。
語法如下：

```js
data(){
  return{
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
}
```
```template
<li v-for="item in items">
  {{ item.message }}
</li>
```

當然可以。以下是對您提供的 `v-bind` 指令部分的補充和擴展：

### `v-bind` 指令的進階使用

`v-bind` 指令不僅限於綁定圖片的 `src` 屬性，它可以綁定任何 HTML 屬性到 Vue 實例的數據上。以下是一些進階的用法示例：

#### 綁定樣式

`v-bind` 也可以用來動態綁定 CSS 樣式。例如，您可以根據 Vue 實例的數據動態改變元素的樣式：

```vue
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

這裡 `activeColor` 和 `fontSize` 是 Vue 實例的數據屬性。當這些屬性的值改變時，`div` 的字體顏色和字體大小會自動更新。

#### 綁定類別

同樣，`v-bind` 可以用來綁定元素的類別：

```vue
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
```

在這裡，`isActive` 和 `hasError` 是 Vue 實例的數據屬性。如果 `isActive` 為真（true），則 `div` 會加上 `active` 類別；如果 `hasError` 為真，則加上 `text-danger` 類別。

#### 綁定到動態屬性

有時候，您可能需要綁定到一個動態的屬性名，這時可以利用方括號 `[]` 來實現：

```vue
<button v-bind:[key]="value">Button</button>
```

這裡 `key` 是一個動態的屬性名（例如 `'href'`、`'title'` 等），它的值來自於 Vue 實例的數據。`value` 是該屬性的值。

### 縮寫

`v-bind` 指令有一個非常實用的縮寫方式。您可以直接使用冒號 `:` 來代替 `v-bind:`。例如：

```vue
<img :src="imageSrc">
<div :style="{ color: activeColor }"></div>
<div :class="{ active: isActive }"></div>
<button :[key]="value">Button</button>
```

這種縮寫方式使模板更加簡潔易讀，同時保持了所有的功能和彈性。

這些進階用法和縮寫技巧可以幫助您更有效地在 Vue 應用程序中利用 `v-bind` 指令，使您的代碼更加動態和靈活。