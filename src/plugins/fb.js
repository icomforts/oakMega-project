import { useAuthStore } from "@/stores/auth";
export async function facebookInit() {
  return new Promise((resolve) => {
    if (!window.FB) {
      window.fbAsyncInit = function () {
        FB.init({
          appId: "3108179712827520", // 填入自己 app 的 id
          cookie: true,
          xfbml: true,
          version: "v13.0", // 目前版本
        });
        FB.getLoginStatus(function (response) {
          statusChangeCallback(response);
        });
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/zh_TW/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
    resolve();
  });
}
const statusChangeCallback = (response) => {
  const authStore = useAuthStore();
  if (response.status === "connected") {
    authStore.setLoginState("facebook", true);
    getProfile();
  } else if (response.status === "not_authorized") {
    authStore.setLoginState("facebook", false);
  } else if (response.status === "unknown") {
    authStore.setLoginState("facebook", false);
  } else {
    authStore.setLoginState("facebook", false);
  }
};
export const fbLogin = () => {
  FB.login(
    (response) => {
      statusChangeCallback(response);
    },
    {
      scope: "email, public_profile",
      return_scopes: true,
    }
  );
};
export const fbLogout = () => {
  console.log(":sss");
  FB.logout((response) => {
    statusChangeCallback(response);
  });
};
export const getProfile = () => {
  FB.api("/me?fields=name,id,email", function (response) {
    useAuthStore().setUserData("facebook", response);
  });
};
