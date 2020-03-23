<template>
  <div class="wrapper">
    <h1>Lista kursów</h1>
    <ul>
      <li v-for="course in courses" v-bind:key="course.id">
        {{ course.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "@/utils/helper";

export default {
  name: "CourseList",
  data() {
    return {
      courses: []
    };
  },

  mounted() {
    axios
      .get(`${server.baseURL}/courses`)
      .then(courses => (this.courses = courses.data));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex;
  align-items: center;
  flex-direction: column;
}
ul {
  list-style: none;
  width: 80%;
  height: 100%;
}
</style>
