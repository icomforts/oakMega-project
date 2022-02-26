import { useAuthStore } from "@/stores/auth";
export async function googleInit() {
  return new Promise((resolve) => {
    const authStore = useAuthStore();
    gapi.load("auth2", function () {
      gapi.auth2
        .init({
          client_id:
            "401934269274-tfin2v3k20838ref6h0aetidgpka7olk.apps.googleusercontent.com",
        })
        .then(() => {
          let GoogleAuth = gapi.auth2.getAuthInstance();
          let state = GoogleAuth.isSignedIn.get();
          authStore.setLoginState("google", state);
          if (state) {
            let profile = GoogleAuth.currentUser.get().getBasicProfile();
            useAuthStore().setUserData("google", {
              name: profile.getName(),
              avatar: profile.getImageUrl(),
            });
          } else {
            randerButton(gapi);
          }
          GoogleAuth.isSignedIn.listen(signinChanged);
          resolve();
        });
    });
  });
}
export const googleLogOut = () => {
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
    googleInit();
  });
};
const signinChanged = (status) => {
  const authStore = useAuthStore();
  authStore.setLoginState("google", status);
};
const randerButton = (gapi) => {
  gapi.signin2.render("my-signin2", {
    scope: "profile email",
    width: 120,
    height: 40,
    longtitle: false,
    theme: "dark",
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
};
function onSuccess(googleUser) {
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
  console.log(error);
}
