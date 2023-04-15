import axios from "axios";
import { getUserInfo } from "../utils";

const FLASK_SERVER = "http://119.91.210.228:5000";

const request = axios.create({
  baseURL: FLASK_SERVER,
  timeout: 10000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

request.interceptors.request.use(function (config) {
  config.headers.user_id = getUserInfo().user_id || null;
  config.headers.user_role = getUserInfo().user_role || null;
  return config;
}, null);

request.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      if (response.data && response.data.ok === 0) {
        return Promise.reject(response.status);
      }
      return response.data || {};
    }
    return Promise.reject(response.status);
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
