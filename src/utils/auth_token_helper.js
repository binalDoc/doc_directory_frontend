import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  deleteAuthToken,
  getAuthToken,
  saveAuthToken,
} from "./helper";

export const saveToken = (access_token) => {
  setAuthTokenToAxiox(access_token);
  saveAuthToken(access_token);
};

export const clearToken = () => {
  deleteAuthToken();
  clearAuthTokenFromAxios();
};

// header methods
const setAuthTokenToAxiox = (token) => {
  try {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } catch (e) {
    console.error("Error while settup token", e);
  }
};

const clearAuthTokenFromAxios = () => {
  delete axios.defaults.headers.common["Authorization"];
};
