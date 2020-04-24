import axios from "axios";
import { server } from "@/utils/helper";
export function addCourse(courseData) {
  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);
  const token = user.token;
  return new Promise((res, rej) => {
    axios
      .post(`${server.baseURL}/courses`, courseData, {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((response) => {
        res(response.data);
      })

      .catch(() => {
        rej("Wystąpił błąd");
      });
  });
}
