<template >
  <div class="search">
    <input
      type="text"
      v-model="searchText"
      @keyup.enter="searchAddress"
      placeholder="請輸入您要查詢的地址"
    />
    <div class="icon" @click="searchAddress">
      <i class="fa-solid fa-magnifying-glass fa-xl"></i>
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
    padding: 0.75rem;
    border-radius: 4px;
    outline: none;
    border: none;
    font-size: 1.5rem;
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