import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://iambooking.herokuapp.com/api/",
});
