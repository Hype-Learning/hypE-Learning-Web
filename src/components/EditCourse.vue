<template>
  <div>
    <v-form class="mt-10">
      <v-container fill-height fluid>
        <v-card class="mx-auto" max-width="700" tile>
          <v-row justify="center" align="center">
            <v-col cols="12" md="7"><h1>Edytuj kurs</h1></v-col>

            <v-col cols="12" md="7">
              <v-text-field v-model="title" label="Tytuł"></v-text-field>
            </v-col>

            <v-col cols="12" md="7">
              <v-text-field v-model="description" label="Opis"></v-text-field>
            </v-col>

            <v-col cols="12" md="7">
              <v-text-field
                v-model="announcement"
                label="Ogłoszenia"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="7">
              <v-btn color="success" class="mr-4" @click="editCourse">
                Zapisz
              </v-btn></v-col
            >
          </v-row>
        </v-card>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "@/utils/helper";

export default {
  name: "EditCourse",
  data() {
    return {
      id: "",
      title: "",
      description: "",
      announcement: "",
    };
  },

  methods: {
    editCourse: function() {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);
      const token = user.token;
      axios.put(
        `${server.baseURL}/courses/${this.id}`,
        {
          title: this.title,
          description: this.description,
          announcement: this.announcement,
        },
        {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      );
    },
  },

  beforeMount() {
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
