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
  width: 100%;
  font-weight: normal;
  min-height: 100vh;
}
</style>
