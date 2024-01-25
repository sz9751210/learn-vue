<template>
  <div id="app">
    <h1>Vue 生命週期鉤子示例</h1>
    <button @click="toggleComponent">切換組件顯示/隱藏</button>
    <LifecycleExample v-if="showComponent" />
    <!-- 使用v-if 動態控制組件的掛載與卸載 -->
  </div>
</template>

<script>
import LifecycleExample from "./components/LifecycleExample.vue";

export default {
  name: "App",
  components: {
    LifecycleExample,
  },
  data() {
    return {
      showComponent: true,
    };
  },
  methods: {
    toggleComponent() {
      this.showComponent = !this.showComponent;
    },
  },
};
</script>

<style>
/* 您可以在這裡添加一些全局樣式 */
#app {
  text-align: center;
}
</style>
