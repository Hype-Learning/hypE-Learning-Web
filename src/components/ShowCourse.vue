<template>
  <div>
    <template v-if="id">
      <v-container fill-height fluid>
        <v-layout row wrap align-start justify-center mt-10>
          <v-card max-width="1100" tile>
            <v-col>
              <h1>{{ title }}</h1>
              <br />

              <h3>Opis kursu</h3>
              <p>{{ description }}</p>
              <br />
              <h3>Ogłoszenia</h3>
              <p>{{ announcement }}</p>
              <br />
              <router-link :to="{ name: 'TopicsList' }">
                <v-btn color="primary" class="mr-4">
                  Tematy
                </v-btn>
                <br />
                <br />
              </router-link>

              <template v-if="currentUser.role === 'instructor'">
                <br />
                <h2>Zarządzaj kursem</h2>
                <br />
                <v-btn color="error" class="mr-4" @click="deleteCourse(id)">
                  Usuń kurs
                </v-btn>

                <router-link :to="{ name: 'EditCourse' }">
                  <v-btn color="warning" class="mr-4">
                    Edytuj kurs
                  </v-btn>
                </router-link>
                <router-link :to="{ name: 'AddParticipants' }">
                  <v-btn color="success" class="mr-4">
                    Dodaj uczestnika
                  </v-btn>
                </router-link>
              </template>
              <template v-if="currentUser.role === 'admin'">
                <v-btn color="error" class="mr-4" @click="deleteCourse(id)">
                  Usuń kurs
                </v-btn>
              </template>
            </v-col>

            <h2 class="pa-2">Uczestnicy kursu</h2>
            <v-row
              v-for="user in participants"
              v-bind:key="user.id"
              class="pa-2"
            >
              <v-col cols="3" sm="6" md="3">
                <v-text-field
                  v-model="user.firstName"
                  label="Imię"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="6" md="3">
                <v-text-field
                  v-model="user.lastName"
                  label="Nazwisko"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="6" md="3">
                <v-text-field
                  v-model="user.email"
                  label="E-mail"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="6" md="3">
                <v-btn
                  color="error"
                  class="mr-4"
                  @click="deleteParticipant(user.id)"
                >
                  Usuń uczestnika
                </v-btn>
              </v-col>
            </v-row>
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
import ErrorPageComponent from "@/components/ErrorPageComponent";
import { deleteCourse } from "@/helpers/course";

export default {
  name: "ShowCourse",
  components: { ErrorPageComponent: ErrorPageComponent },
  data() {
    return {
      id: "",
      title: "",
      description: "",
      announcement: "",
      participants: [],
    };
  },

  methods: {
    deleteCourse(id) {
      deleteCourse(id);
    },
    deleteParticipant: async function(userId) {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);
      const token = user.token;
      await axios.delete(
        `${server.baseURL}/courses/${this.id}/students/${userId}`,
        {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      );

      axios
        .get(`${server.baseURL}/courses/${this.$route.params.id}`, {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        })
        .then((course) => {
          this.participants = course.data.participants;
        });
    },
  },

  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
  beforeMount() {
    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson);
    const token = user.token;

    axios
      .get(`${server.baseURL}/courses/${this.$route.params.id}`, {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((course) => {
        (this.id = course.data.id),
          (this.title = course.data.title),
          (this.description = course.data.description),
          (this.announcement = course.data.announcement),
          (this.participants = course.data.participants);
      });
  },
};
</script>
