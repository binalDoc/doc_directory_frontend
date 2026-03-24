import {
  AUTH_TOKEN_KEY,
  USER_DETAILS_KEY,
  ASSET_BASE_URL
} from "../constants/app.constant";

export const saveAuthToken = (data) => {
  try {
    let jsonOfItem = localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(data));
    return jsonOfItem;
  } catch (error) {
    throw error;
  }
};

export const getAuthToken = () => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) return JSON.parse(token);
    return undefined;
  } catch (error) {
    throw error;
  }
};

export const deleteAuthToken = () => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    throw error;
  }
};

export const saveUserDetails = (data) => {
  try {
    let jsonOfItem = localStorage.setItem(
      USER_DETAILS_KEY,
      JSON.stringify(data)
    );
    return jsonOfItem;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = () => {
  try {
    const user = localStorage.getItem(USER_DETAILS_KEY);
    if (user) return JSON.parse(user);
    return null;
  } catch (error) {
    // console.error(error);
    return null;
  }
};

export const deleteUserDetails = () => {
  try {
    localStorage.removeItem(USER_DETAILS_KEY);
  } catch (error) {
    throw error;
  }
};

export const deleteAllLocalData = () => {
  try {
    localStorage.clear();
  } catch (error) {
    throw error;
  }
};

export function isEmpty(value) {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  ) {
    return true;
  } else {
    return false;
  }
}

export const getImageUrl = (path) => {
  if (!path) return "";

  // already full URL
  if (path.startsWith("http")) return path;

  return `${ASSET_BASE_URL}${path}`;
};

export const getIndianTime = (original_datetime) => {
  return new Date(original_datetime).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short"
  });
};