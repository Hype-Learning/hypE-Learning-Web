import axios from "axios";
import { server } from "@/utils/helper";

export function signIn(credentials) {
  return new Promise((res, rej) => {
    axios
      .post(`${server.baseURL}/auth/signin`, credentials)
      .then((response) => {
        res(response.data);
      })

      .catch(() => {
        rej("Zły e-mail lub hasło");
      });
  });
}

export function getLocalUser() {
  const userStr = localStorage.getItem("user");

  if (!userStr) {
    return null;
  }
  return JSON.parse(userStr);
}

export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
