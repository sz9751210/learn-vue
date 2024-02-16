<template>
    <div>
      <div class="horizontal-scroll">
        <v-list class="d-flex align-start">
          <v-list-item v-for="resource in gcpResources" :key="resource.name" class="mr-3">
            <v-list-item-icon>
              <v-icon >{{ resource.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ resource.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const gcpResources = ref([
    { name: 'GCE', icon: 'mdi-cloud' },
    { name: 'GKE', icon: 'mdi-kubernetes' },
    { name: 'VPC', icon: 'mdi-network' },
    // 更多 GCP 资源...
  ]);
  </script>
  
  <style scoped>
  .horizontal-scroll {
    overflow-x: auto;
    display: flex;
    background-color: rgb(102, 118, 102);
  }
  
  .v-list {
    flex-wrap: nowrap; /* 防止项换行，确保水平排列 */
  }
  
  .v-list-item {
    flex: 0 0 auto; /* 防止列表项缩放，确保按内容实际宽度显示 */
  }
  </style>
  