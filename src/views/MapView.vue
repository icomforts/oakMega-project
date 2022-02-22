<template>
  <div class="about">
    <div id="map"></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

onMounted(() => {
  // 取得user GPS
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successGPS, errorGPS);
  }
  getGeoJSON();
});
//點位資料
const directories = [
  "banxin.json",
  "tucheng.json",
  "haishan.json",
  "data1.json",
  "data2.json",
  "data3.json",
];
const center = ref([]);
const map = ref();
const data = ref();
// 成功取得GPS
function successGPS(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  center.value = [lat, lng];
  triggerLeaflet();
}
// 無法取得GPS
function errorGPS() {
  window.alert("無法判斷您的所在位置，無法使用此功能。");
  triggerLeaflet();
}
//讀取GeoJSON
const getGeoJSON = async () => {
  data.value = [];
  const promises = [];
  for (const directory of directories) {
    const res = axios.post(
      "https://asia-east2-botfat.cloudfunctions.net/project_controller",
      {
        directory: directory,
        function: "xinbei_json",
      }
    );
    promises.push(res);
  }
  const results = await Promise.all(promises);
  data.value = results.map((res) => res.data.result);
  drewMap();
};
// 繪製GeoJSON區塊
const drewMap = () => {
  let geojsonStyle = {
    fillColor: "#c8d5ea",
    color: "#3388ff",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.4,
  };
  let options = {
    maxZoom: 20,
    tolerance: 3,
    debug: 0,
    style: geojsonStyle,
  };
  data.value.forEach((i) => {
    L.geoJson.vt(i, options).addTo(map.value);
  });
};
// 繪製地圖
const triggerLeaflet = () => {
  // 設定地圖
  map.value = L.map("map").setView(center.value, 13);
  // 設定圖層
  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);
  // 新增地圖工具
  L.control.locate().addTo(map.value);
  // L.marker(center.value)
  //   .addTo(map.value)
  //   .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
  //   .openPopup();
};
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
#map {
  height: 80vh;
  width: 80vw;
}
</style>
