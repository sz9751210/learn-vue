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
`v-on`指令可以監聽DOM元素的事件。
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
