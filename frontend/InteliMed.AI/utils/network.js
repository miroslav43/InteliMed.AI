import axios from "axios";
export const baseHttpURL = `https://f282-5-14-128-210.ngrok-free.app`;

export const axiosInstanceToApi = axios.create({
  baseURL: baseHttpURL,
  timeout: 30000e3,
});

const getJWT = () => {
  return localStorage.getItem("token");
};
