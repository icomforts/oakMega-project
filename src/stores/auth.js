import { reactive } from "vue";
import { defineStore } from "pinia";
export const useAuthStore = defineStore("auth", () => {
  const loginState = reactive({
    google: {
      status: false,
      data: {},
    },
    facebook: {
      status: false,
      data: {},
    },
  });

  const setLoginState = (platform, status) => {
    loginState[platform].status = status;
  };
  const setUserData = (platform, data) => {
    loginState[platform].data = data;
  };
  return {
    loginState,
    setLoginState,
    setUserData,
  };
});
