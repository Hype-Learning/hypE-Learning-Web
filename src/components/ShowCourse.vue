<template>
  <div>
    <template v-if="id">
      <v-container fill-height fluid>
        <v-layout row wrap align-start justify-center mt-10>
          <v-card max-width="700" tile>
            <v-col>
              <h1>{{ title }}</h1>
              <br />

              <p>Opis kursu</p>
              <p>{{ description }}</p>
              <br />
              <p>Ogłoszenia</p>
              <p>{{ announcement }}</p>

              <template
                v-if="
                  currentUser.role === 'admin' ||
                    currentUser.role === 'instructor'
                "
              >
                <v-btn color="error" class="mr-4" @click="deleteCourse(id)">
                  Usuń kurs
                </v-btn>
              </template>
              <router-link :to="{ name: 'EditCourse' }">
                <v-btn color="warning" class="mr-4">
                  Edytuj kurs
                </v-btn>
              </router-link></v-col
            >
          </v-card>
        </v-layout>
      </v-container>
    </template>
    <template v-else>
      <ErrorPageComponent />
    </template>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "@/utils/helper";
import { deleteCourse } from "@/helpers/course";
import ErrorPageComponent from "@/components/ErrorPageComponent";

export default {
  name: "ShowCourse",
  components: { ErrorPageComponent: ErrorPageComponent },
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

  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
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
