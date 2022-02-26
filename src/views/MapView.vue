<template>
  <div class="about">
    <div class="accountBox">
      <div @click="googleLogOut">google logout</div>
      <div @click="fbLogout">facebook logout</div>
    </div>
    <div class="mapBox">
      <div id="map"></div>
    </div>
    <div class="searchBox">
      <Search />
    </div>
    <div class="stopListBox">
      <StopList />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, provide } from "vue";
import StopList from "@/components/map/StopList.vue";
import Search from "@/components/map/Search.vue";
import { useAuthStore } from "@/stores/auth";
import { googleLogOut } from "@/plugins/google";
import { fbLogout } from "@/plugins/fb";
import mapApi from "@/apis/map";

const authStore = useAuthStore();

onMounted(() => {
  init();
});
//點位資料
const directories = [
  // "banxin.json",
  "tucheng.json",
  // "haishan.json",
  // "data1.json",
  // "data2.json",
  // "data3.json",
];
const center = ref([25.03552, 121.421692]);
const map = ref();
const data = ref();

const stopList = ref();
const markers = ref();

const init = () => {
  // 取得user GPS
  checkGPS();
  //讀取GeoJSON
  getGeoJSON();
};
const checkGPS = () => {
  //檢查GPS
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successGPS, errorGPS);
  }
};
// 成功取得GPS
function successGPS(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  setCenter(lat, lng);
  // 繪製地圖
  triggerLeaflet();
  setUserData();
  getUserInfo();
}
// 無法取得GPS
function errorGPS() {
  window.alert("無法判斷您的所在位置，無法使用此功能。");
  // 繪製地圖
  triggerLeaflet();
}
// 繪製地圖
const triggerLeaflet = () => {
  // 設定地圖
  map.value = L.map("map", {
    zoomControl: true,
    zoom: 1,
    zoomAnimation: true,
    fadeAnimation: true,
    markerZoomAnimation: true,
  }).setView(center.value, 13);
  // 設定圖層
  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution: "Ken",
  }).addTo(map.value);
  // 新增地圖工具
  L.control.locate().addTo(map.value);
  map.value.on("locationfound", function (e) {
    setCenter(e.latitude, e.longitude);
    getUserInfo();
    console.log(e);
  });
};
const setUserData = () => {
  const userIcon = L.icon({
    iconUrl: `${authStore.loginState.google.data.avatar}`,
    iconSize: [36, 36], // size of the icon
  });
  L.marker(center.value, { icon: userIcon })
    .addTo(map.value)
    .bindPopup(
      `<div class='userPopup'>
      <img   
            src="https://graph.facebook.com/${authStore.loginState.facebook.data.id}/picture?width=80"
            alt="avatar"
          /><img
      
            src="${authStore.loginState.google.data.avatar}"
            alt="avatar"
          /></div>`
    )
    .openPopup();
};
const getUserInfo = async () => {
  const func = "xinbei_distance";
  // 通過API獲取資料塞回，去除重複後，繪製點位資訊
  const res = await mapApi.getGeoJSON({
    lat: center.value[0],
    lng: center.value[1],
    function: func,
  });
  //去除重複站點
  let hash = {};
  let newArr = res.data.result.reduce((item, next) => {
    hash[next.stop_name]
      ? ""
      : (hash[next.stop_name] = true && item.push(next));
    return item;
  }, []);
  stopList.value = newArr;
  drewMarkers();
};
const getGeoJSON = async () => {
  // 通過API獲取資料塞回，並呼叫繪製
  data.value = [];
  const promises = [];
  for (const directory of directories) {
    const res = mapApi.getGeoJSON({
      directory: directory,
      function: "xinbei_json",
    });
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
// 繪製群聚站點
const drewMarkers = () => {
  markers.value = L.markerClusterGroup();
  stopList.value
    .map((item) =>
      L.marker(new L.LatLng(item.latitude, item.longitude)) // 新增Marker
        .bindPopup(`${item.stop_name}`)
    ) // 資訊視窗
    .forEach((item) => markers.value.addLayer(item)); // 把marker加入 L.markerCluster
  map.value.addLayer(markers.value);
};

// 設定中心點
const setCenter = (lat, lng) => {
  center.value = [lat, lng];
};

provide("markers", markers);
provide("stopList", stopList);
provide("map", map);
provide("setCenter", setCenter);
provide("getUserInfo", getUserInfo);
</script>
<style lang="scss" scoped>
.about {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.accountBox {
  color: black;
}
.stopListBox {
  display: flex;
  justify-content: center;
}
.searchBox {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
.mapBox {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
}
#map {
  border-radius: 10px;
  overflow: hidden;
  height: 50vh;
  width: 100%;
  max-width: 60vw;
  border: solid 10px rgb(86, 165, 211);
}
</style>
<style lang="scss">
.userPopup {
  display: flex;
  justify-content: space-between;
  img {
    border-radius: 100%;
    width: 60px;
    height: 60px;
  }
}
</style>