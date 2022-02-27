<template >
  <div class="logoutBtn" @click="logout">
    <slot></slot>
  </div>
</template>
<script setup>
import { googleLogOut } from "@/plugins/google";
import { fbLogout } from "@/plugins/fb";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  platform: String,
});
const logout = () => {
  if (props.platform === "facebook") {
    fbLogout();
  } else if (props.platform === "google") {
    googleLogOut();
  }
  router.push("/");
};
</script>
<style lang="scss" scoped>
.logoutBtn {
  background: rgb(202, 202, 202);
  padding: 0.25rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  color: rgb(126, 126, 126);
  width: fit-content;
  &:hover {
    background: rgb(126, 126, 126);
    color: rgb(202, 202, 202);
  }
}
</style>