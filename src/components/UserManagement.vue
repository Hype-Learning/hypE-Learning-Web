<template>
  <div>
    <v-form>
      <v-container>
        <v-card>
          <v-card-title>
            <span class="headline">Panel administratora</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row v-for="user in users" v-bind:key="user.id">
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

                <template v-if="user.role === 'inactive'">
                  <v-col cols="2" sm="6" md="2">
                    <v-select
                      @input="changeRole(user.id, user.role)"
                      v-model="user.role"
                      :items="roles"
                      label="Rola"
                    ></v-select>
                  </v-col>
                </template>
                <template v-else>
                  <v-col cols="2" sm="6" md="2">
                    <v-text-field
                      v-model="user.role"
                      label="Rola"
                      readonly
                    ></v-text-field>
                  </v-col>
                </template>

                <v-col cols="1" sm="6" md="1" @click="changeStatus(user.id)">
                  <span>Ban</span>
                  <v-switch
                    v-model="user.isBlocked"
                    color="red darken-3"
                  ></v-switch>
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
  name: "UserManagement",
  data() {
    return {
      users: [],
      roles: ["inactive", "student", "instructor", "admin"],
    };
  },

  methods: {
    changeStatus: function(id) {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);
      const token = user.token;

      axios.put(
        `${server.baseURL}/users/management/changeStatus/${id}`,
        {},
        {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      );
    },

    changeRole: function(id, role) {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);
      const token = user.token;

      axios.put(
        `${server.baseURL}/users/management/${role}/${id}`,
        {},
        {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      );
    },
  },

  beforeMount() {
    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson);
    const token = user.token;
    axios
      .get(`${server.baseURL}/users/management`, {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((users) => (this.users = users.data));
  },
};
</script>

<style scoped>
span {
  font-size: 12px;
}
</style>
