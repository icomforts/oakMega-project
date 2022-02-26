<template >
  <ul>
    <li
      v-for="stop in stopList"
      :key="stop.id"
      @click="openMarker(stop.latitude, stop.longitude)"
    >
      <span class="name">
        {{ stop.stop_name }}
      </span>
      <span class="distance"> {{ stop.distance }}<small>km</small> </span>
    </li>
  </ul>
</template>
<script setup>
import { inject } from "vue";
const markers = inject("markers");
const stopList = inject("stopList");
//移至選擇點位
const openMarker = (lat, lng) => {
  markers.value.eachLayer((layer) => {
    // 抓取圖層的 經緯度
    const eachLat = layer._latlng.lat;
    const eachLng = layer._latlng.lng;
    // 如果與參數的經緯度相同，就抓取那個 layer
    if (eachLat === lat && eachLng === lng) {
      markers.value.zoomToShowLayer(layer, () => layer.openPopup());
    }
  });
};
</script>
<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 50%;
  height: 300px;
  overflow-y: scroll;
  li {
    background: white;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    color: #3d3d3d;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    .name {
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      font-weight: bold;
    }
    .distance {
      color: rgb(86, 122, 190);
      font-size: 2rem;
      small {
        font-size: 1rem;
      }
    }
  }
}
</style>