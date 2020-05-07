<template>
  <div class="wrapper">
    <br />
    <h1>Lista kursów</h1>
    <v-list>
      <v-list-item v-for="course in courses" v-bind:key="course.id">
        <v-list-item-content>
          <router-link :to="`/courses/${course.id}`">
            <v-list-item-title v-text="course.title"> </v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "@/utils/helper";

export default {
  name: "CourseList",
  data() {
    return {
      courses: [],
    };
  },

  methods: {
    goToCourse(id) {
      axios.get(`${server.baseURL}/courses/` + id);
    },
  },
  mounted() {
    axios
      .get(`${server.baseURL}/courses`)
      .then((courses) => (this.courses = courses.data));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  margin-left: 100px;
  font-size: 16px;
}
ul {
  list-style: none;
  width: 80%;
  height: 100%;
}
a {
  text-decoration: none;
  font-weight: 700;
}
</style>
