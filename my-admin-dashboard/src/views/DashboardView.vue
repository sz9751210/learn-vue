<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>導航抽屜</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- 添加到 Google 的連結 -->
        <v-list-item @click="gotoGcpResources">
          <div class="d-flex align-center" style="width: 100%">
            <v-list-item-icon class="shrink-0 mr-2">
              <img
                src="../assets/google.svg"
                alt="Google"
                class="custom-icon"
              />
              <!-- <v-icon>mdi-open-in-new</v-icon> -->
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Google</v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>
        <!-- end 添加到 Google 的連結 -->

        <!-- 添加到 AWS 的連結 -->
        <v-list-item @click="gotoAwsResources">
          <div class="d-flex align-center" style="width: 100%">
            <v-list-item-icon class="shrink-0 mr-2">
              <img src="../assets/aws.svg" alt="Google" class="custom-icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>AWS</v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>
        <!-- end 添加到 Google 的連結 -->
        <!-- 更多導航項目 -->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-toolbar-title>應用程序欄</v-toolbar-title>
    </v-app-bar>

    <!-- GCP RESOURCES -->
    <v-main>
      <v-container
        class="d-flex align-center justify-center"
        style="min-height: 300px"
      >
        <router-view></router-view>
        <!-- 用于显示基于路由的组件，如 GcpResourcesView -->
      </v-container>
    </v-main>

    <!-- <v-main>
      <v-container
      class="d-flex align-center justify-center"
      style="min-height: 300px"
      >
      <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">姓名</th>
                <th class="text-left">郵箱</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>

    </v-main> -->
  </v-app>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const gotoGcpResources = () => {
  router.push({ name: "gcp-resources" });
};

const gotoAwsResources = () => {
  router.push({ name: "aws-resources" });
};
</script>

<style scoped>
.custom-icon {
  width: 20px;
  height: 20px;
}
</style>
