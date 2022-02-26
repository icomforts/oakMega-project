<template >
  <div class="search">
    <input
      type="text"
      v-model="searchText"
      @keyup.enter="searchAddress"
      placeholder="請輸入您要查詢的地址"
    />
    <div class="icon" @click="searchAddress">
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="search"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="svg-inline--fa fa-search fa-fw"
      >
        <path
          fill="black"
          d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
          class=""
        ></path>
      </svg>
    </div>
    <ul class="searchResult" v-if="searchText && searchResult.length > 0">
      <li
        v-for="result in searchResult"
        :key="result"
        @click="
          selectSearchItem(
            result.Location.DisplayPosition.Latitude,
            result.Location.DisplayPosition.Longitude,
            result.Location.Address.Label
          )
        "
      >
        {{ result.Location.Address.Label }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import mapApi from "@/apis/map";

import { inject, ref } from "vue";
const setCenter = inject("setCenter");
const getUserInfo = inject("getUserInfo");
const map = inject("map");
const searchText = ref("");
const searchResult = ref([]);
//搜尋功能
const searchAddress = async () => {
  // 用here抓取地址搜尋
  if (searchText.value) {
    try {
      const res = await mapApi.searchAddress(searchText.value);
      const resultData = res.data.Response.View[0].Result;
      searchResult.value = resultData;
    } catch (e) {
      searchResult.value = [];
    }
  }
};
//選取搜尋項
const selectSearchItem = (lat, lng, label) => {
  // 以選取點為中心點，重抓資料
  setCenter(lat, lng);
  L.marker([lat, lng]).addTo(map.value).bindPopup(`${label}`).openPopup();
  getUserInfo();
  searchResult.value = [];
};
</script>
<style lang="scss" scoped>
.search {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.5rem;
    cursor: pointer;
  }
  input {
    padding: 0.5rem;
    border-radius: 4px;
    outline: none;
    border: none;
  }
  .searchResult {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 300px;
    background: rgb(138, 138, 138);
    padding: 0.5rem;
    border-radius: 4px;
    top: calc(100% + 10px);
    gap: 0.5rem 0;
    li {
      padding: 0.5rem;
      color: gray;
      background: rgb(231, 231, 231);
      cursor: pointer;
      &:hover {
        background: gray;
        color: rgb(231, 231, 231);
      }
    }
  }
}
</style>