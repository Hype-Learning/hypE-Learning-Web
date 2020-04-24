<template>
  <div class="wrapper">
    <p>{{ title }}</p>
    <p>{{ description }}</p>
    <p>{{ announcement }}</p>

    <v-btn color="success" class="mr-4" @click="deleteCourse(id)">
      Usuń kurs
    </v-btn>
    <v-btn color="success" class="mr-4" @click="editCourse(id)">
      Edytuj kurs
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "@/utils/helper";
import { deleteCourse } from "@/helpers/course";

export default {
  name: "ShowCourse",
  data() {
    return {
      id: "",
      title: "",
      description: "",
      announcement: "",
    };
  },

  methods: {
    deleteCourse(id) {
      deleteCourse(id);
    },
  },

  mounted() {
    axios
      .get(`${server.baseURL}/courses/${this.$route.params.id}`)
      .then((course) => {
        (this.id = course.data.id),
          (this.title = course.data.title),
          (this.description = course.data.description),
          (this.announcement = course.data.announcement);
      });
  },
};
</script>
