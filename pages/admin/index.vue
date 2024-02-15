<template>
  <div>
    <p>top admin</p>
    <el-button @click="logout">click to logout</el-button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin-have-sidebar',
  middleware: ['admin-authenticated', 'admin-only'],
});

const logout = () => {
  handleLogout();
  routerPush('/admin/login');
};
</script>

<style scoped></style>
