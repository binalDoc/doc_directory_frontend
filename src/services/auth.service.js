import { AUTH_API } from "../constants/api.constant";
import { saveToken } from "../utils/auth_token_helper";
import AXIOS_INSTANCE from "../utils/api";

const registerUser = async (payload) => {
  try {
    const response = await AXIOS_INSTANCE.post(`${AUTH_API}/register`, payload);
    saveToken(response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (payload) => {
  try {
    const response = await AXIOS_INSTANCE.post(`${AUTH_API}/login`, payload);
    saveToken(response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const authService = {
  registerUser,
  loginUser
};

export default authService;
