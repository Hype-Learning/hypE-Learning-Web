import axios from "axios"
import {
    server
} from "@/utils/helper";


export function signIn(credentials) {
    return new Promise((res, rej) => {

        axios.post(`${server.baseURL}/auth/signin`, credentials)
            .then((response) => {
                res(response.data);
            })

            .catch(() => {
                rej("Zły e-mail lub hasło");
            })
    })
}

export function getLocalUser() {
    const userStr = localStorage.getItem("user");

    if (!userStr) {
        return null;
    }
    return JSON.parse(userStr);

}


export function getLocalEmail() {
    const userEmail = localStorage.getItem("email");

    if (!userEmail) {
        return null;
    }
    return JSON.parse(userEmail);

}