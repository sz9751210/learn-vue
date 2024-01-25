<template>
    <div>
      <h1>{{ message }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LifecycleExample',
    data() {
      return {
        message: '初次渲染的訊息',
      }
    },
    // mounted 鉤子：當組件掛載到 DOM 上後執行。
    mounted() {
      console.log('組件被掛載');
      // 假設我們想要在組件掛載 2 秒後改變訊息。
      setTimeout(() => {
        this.message = '2秒後更新的訊息';
      }, 2000);
    },
    // updated 鉤子：當組件的響應式數據發生變化且重新渲染後執行。
    updated() {
      console.log('組件被更新');
    },
    // unmounted 鉤子：當組件即將從 DOM 上卸載時執行。
    unmounted() {
      console.log('組件即將被卸載');
    },
  }
  </script>
  
  <style>
  h1 {
    color: blue;
  }
  </style>
  