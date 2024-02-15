<template>
  <Login :title-login="titleLogin" :role="role" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['admin-authenticated'],
});

const titleLogin = ref('Login Management Screen');
const role = ref('ADMIN');
</script>

<style scoped></style>
