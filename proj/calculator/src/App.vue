<template>
  <div id="app">
    <MyCalculator/>
  </div>
</template>

<script>
import MyCalculator from './components/MyCalculator.vue';

export default {
  name: 'App',
  components: {
    MyCalculator
  }
};
</script>

<style>
/* 全局樣式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* 其他全局樣式 */
</style>
