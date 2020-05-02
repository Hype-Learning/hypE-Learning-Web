<template>
  <div>
    <v-form>
      <v-container>
        <v-card>
          <v-card-title>
            <span class="headline">Dodaj uczestnika</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row v-for="user in candidates" v-bind:key="user.id">
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
                    color="success"
                    class="mr-4"
                    @click="addParticipant(user.id)"
                  >
                    Dodaj uczestnika
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "@/utils/helper";

export default {
  name: "AddParticipants",
  data() {
    return {
      candidates: [],
    };
  },

  methods: {
    addParticipant: async function(userId) {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);
      const token = user.token;
      await axios.put(
        `${server.baseURL}/courses/${this.$route.params.id}/students/${userId}`,
        {},
        {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      );

      axios
        .get(`${server.baseURL}/courses/${this.$route.params.id}/candidates`, {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        })
        .then((candidates) => {
          this.candidates = candidates.data;
        });
    },
  },

  beforeMount() {
    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson);
    const token = user.token;
    axios
      .get(`${server.baseURL}/courses/${this.$route.params.id}/candidates`, {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((candidates) => (this.candidates = candidates.data));
  },
};
</script>

<style scoped>
span {
  font-size: 12px;
}
</style>
