<script setup>
import { useAuthStore } from "@/stores/auth";
import { googleInit, googleLogOut } from "@/plugins/google";
import { facebookInit, fbLogin, fbLogout } from "@/plugins/fb";

const authStore = useAuthStore();
</script>

<template>
  <div class="loginView">
    <div class="loginModel">
      <div class="dashboard">
        <div class="fb">
          <span>Facebook</span>
          <div
            class="status"
            :class="{ login: authStore.loginState.facebook.status }"
          >
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
              fb login
            </div>
            <div class="logout" @click="fbLogout" v-else>登出</div>
          </div>
        </div>
        <div class="google">
          <span>Google</span>
          <div
            class="status"
            :class="{ login: authStore.loginState.google.status }"
          >
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
            <div
              class="logout"
              @click="googleLogOut"
              v-if="authStore.loginState.google.status"
            >
              登出
            </div>
          </div>
        </div>
      </div>
      <router-link to="/map" class="entryBtn">進入地圖</router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loginView {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
      & > div {
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        span {
          font-size: 1.5rem;
        }
        .status {
          width: 80px;
          height: 80px;
          border-radius: 6px;
          overflow: hidden;
          background: red;
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
          div {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
          }
          .logout {
            background: rgb(202, 202, 202);
            padding: 0.25rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            color: rgb(126, 126, 126);
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
    // .buttons {
    //   display: flex;
    //   .platform {
    //     display: flex;
    //     align-items: center;
    //     .signOutBtn {
    //       background: gray;
    //       padding: 0.5rem;
    //       border-radius: 0.25rem;
    //       cursor: pointer;
    //     }
    //   }
    // }
  }
}
</style>
