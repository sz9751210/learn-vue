`v-on` 是 Vue.js 中用於監聽 DOM 事件的指令。你可以利用它來執行一些當用戶與你的應用互動時應該觸發的方法。

### 使用 `v-on` 的範例

#### Composition API

在 Composition API 中，使用 <script setup> 標籤是 Composition API 的一個更現代且簡潔的使用方式，它讓代碼更加緊湊和易於閱讀。

```javascript
<template>
  <button @click="increment">點擊我</button>
  <p>點擊次數：{{ count }}</p>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

```

在這個版本中，我們使用了 <script setup>，這標明了這個 <script> 塊是在使用 Composition API 的 setup 模式。這種模式自動處理了許多事情，比如將 ref 和 reactive 返回的響應式變量以及函數直接暴露給模板，無需手動返回它們。此外，<script setup> 也支持使用更簡潔的 @click 代替 v-on:click，讓模板代碼更加簡潔。

#### Options API

在 Options API 中，方法定義在 `methods` 選項內，並且可以直接在模板中使用 `this` 來訪問數據屬性。下面是如何在 Options API 中使用 `v-on` 的範例：

```javascript
<template>
  <button v-on:click="increment">點擊我</button>
  <p>點擊次數：{{ count }}</p>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>
```

這個範例與 Composition API 版本的行為相同：當按鈕被點擊時，會觸發 `increment` 方法，從而增加 `count` 的值。

這兩個範例展示了如何在 Vue.js 的兩種不同API風格中使用 `v-on` 指令來處理用戶事件。選擇哪種方式取決於你的項目需求以及你對 Vue 的版本和特性的偏好。