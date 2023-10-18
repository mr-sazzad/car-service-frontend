import { KEY } from "../constants/role";
import { decodedToken } from "./jwt";
import { getFromLocalStorage, setToLocalStorage } from "./localStorage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(KEY, accessToken as string);
};

export const getUserInfo = () => {
  const userToken = getFromLocalStorage(KEY);

  if (userToken) {
    return decodedToken(userToken);
  }
  return "";
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(KEY);

  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};
