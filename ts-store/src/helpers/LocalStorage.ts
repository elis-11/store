import {IUser} from '../types/user.types'

const LOGIN_USER = "LOGIN_USER";

export const storeUserInLocalStorage = (user: IUser) => {
  localStorage.setItem(LOGIN_USER, JSON.stringify(user));
};

export const loadUserInLocalStorage = () => {
  const userStr = localStorage.getItem(LOGIN_USER);

  if (!userStr) return;

  const userObj = JSON.parse(userStr);
  return userObj;
};

export const deleteUserInLocalStorage = () => {
  localStorage.removeItem(LOGIN_USER);
};
