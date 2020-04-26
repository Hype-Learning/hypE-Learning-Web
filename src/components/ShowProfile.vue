<template>
  <div>
    <v-container fill-height fluid>
      <v-layout row wrap align-start justify-center mt-10>
        <v-card max-width="1000">
          <div class="wrapper">
            <h1>Profil</h1>
            <p>{{ currentUser.firstName }} {{ currentUser.lastName }}</p>
            <p>{{ currentUser.email }}</p>

            <v-img
              :src="`${currentUser.fileUrl}`"
              alt=""
              height="125"
              width="125"
            />
            <br />
            <v-btn color="warning" class="mr-4">
              Edytuj profil
            </v-btn>
            <br />
            <br />
            <template v-if="currentUser.role === 'student'">
              <h1>Lista kursów użytkownika</h1>
              <ul>
                <li
                  v-for="course in userCourses"
                  v-bind:key="course.id"
                  @click="goToCourse(course.id)"
                >
                  <router-link :to="`/courses/${course.id}`">
                    {{ course.title }}
                  </router-link>
                </li>
              </ul>
            </template>
          </div>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import { server } from "@/utils/helper";

export default {
  name: "ShowProfile",
  data() {
    return { userCourses: [] };
  },

  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },

  methods: {
    goToCourse(id) {
      axios.get(`${server.baseURL}/courses/` + id);
    },
  },
  beforeMount() {
    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson);
    const token = user.token;
    axios
      .get(`${server.baseURL}/users/courses`, {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((userCourses) => (this.userCourses = userCourses.data));
  },
};
</script>

<style scoped>
.wrapper {
  padding: 10px 50px;
}
</style>
