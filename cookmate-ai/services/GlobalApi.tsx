import axios from "axios";
const axiosClient = axios.create({
  baseURL: "http://192.168.1.11:1337/api",
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`,
  },
});
