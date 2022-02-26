import axios from "axios";
export default {
  getGeoJSON(data) {
    return axios.post(
      `https://asia-east2-botfat.cloudfunctions.net/project_controller`,
      data
    );
  },
  getUserInfo(data) {
    return axios.post(
      `https://asia-east2-botfat.cloudfunctions.net/project_controller`,
      data
    );
  },
  searchAddress(address) {
    return axios.get(
      `https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=${address}&gen=1&apiKey=QZgz8hAfXGkETmKH8sZvZe7keKJqm20mVUMI4aX9eyM`
    );
  },
};
