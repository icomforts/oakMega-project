
<template>
  <div class="loginView">
    <h1>新北市都市更新地點查詢</h1>
    <div class="loginModel">
      <div class="dashboard">
        <div class="fb">
          <span>Facebook</span>
          <div class="status" v-if="authStore.loginState.facebook.status">
            <img
              v-if="authStore.loginState.facebook.status"
              :src="`https://graph.facebook.com/${authStore.loginState.facebook.data.id}/picture?width=80`"
              alt="avatar"
            />
          </div>
          <div class="buttons">
            <div
              class="fb"
              @click="fbLogin"
              v-if="!authStore.loginState.facebook.status"
            >
              登入
            </div>
            <LogoutButton platform="facebook" v-else> 登出 </LogoutButton>
          </div>
        </div>
        <div class="google">
          <span>Google</span>
          <div class="status" v-if="authStore.loginState.google.status">
            <img
              v-if="authStore.loginState.google.status"
              :src="authStore.loginState.google.data.avatar"
              alt="avatar"
            />
          </div>
          <div class="buttons">
            <div
              id="my-signin2"
              v-show="!authStore.loginState.google.status"
            ></div>

            <LogoutButton
              platform="google"
              v-if="authStore.loginState.google.status"
            >
              登出
            </LogoutButton>
          </div>
        </div>
      </div>
      <router-link to="/map" class="entryBtn">進入地圖</router-link>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from "@/stores/auth";
import { fbLogin } from "@/plugins/fb";
import LogoutButton from "@/components/LogoutButton.vue";

const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
.loginView {
  background: var(--color-background);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    margin: 1rem 0;
  }
  .loginModel {
    display: flex;
    width: 400px;
    height: 300px;
    padding: 1rem;
    background: rgb(95, 95, 95);
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    flex-direction: column;
    .dashboard {
      width: 100%;
      display: flex;
      height: 100%;
      justify-content: space-around;
      padding: 1rem;
      & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        span {
          font-size: 1.5rem;
        }
        .status {
          width: 80px;
          height: 80px;
          border-radius: 6px;
          overflow: hidden;
          background: rgb(255, 255, 255);
          &.login {
            background: greenyellow;
          }
          img {
            object-fit: cover;
            width: 100%;
            height: 100%;
          }
        }
        .buttons {
          > div {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            width: 80px;
            cursor: pointer;
            box-shadow: 0 2px 4px 0 rgb(0 0 0 / 25%);
            &:hover {
              box-shadow: 0 0 3px 3px rgb(66 133 244 / 30%);
            }
            &.fb {
              background: #4285f4;
              color: #ffffff;
            }
          }
        }
      }
    }
    .entryBtn {
      background: rgb(75, 75, 75);
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
      color: var(--color-text);
      &:hover {
        background: rgb(58, 58, 58);
      }
    }
  }
}
</style>
<style lang="scss">
.abcRioButtonIcon {
  display: none;
}
</style>