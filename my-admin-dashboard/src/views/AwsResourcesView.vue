<template>
    <v-list dense>
      <v-list-item-group>
        <v-list-item v-for="item in gcpResources" :key="item.name" @click="selectResource(item)">
          <v-list-item-icon class="mr-2">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
        </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script setup>
import { ref } from "vue";

const gcpResources = ref([
  { name: 'EC2', icon: 'mdi-cloud' },
  { name: 'EKS', icon: 'mdi-kubernetes' },
  { name: 'VPC', icon: 'mdi-network' },
  // 其他 GCP 资源...
]);
const selectResource = (item) => {
    console.log(item)
}
</script>

<style scoped>
.custom-icon {
  width: 20px;
  height: 20px;
}
</style>