<template>
  <RouterView />
</template>

<script setup>
import { googleInit } from "@/plugins/google";
import { facebookInit } from "@/plugins/fb";
import { onMounted } from "vue";
onMounted(() => {
  facebookInit();
  googleInit();
});
</script>


<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
