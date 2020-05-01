<template>
  <v-toolbar>
    <router-link :to="{ name: 'Home' }">
      <v-icon>fas fa-home</v-icon>
      HypE-Learning
    </router-link>

    <v-spacer></v-spacer>
    <nav>
      <ul>
        <template v-if="!currentUser">
          <li>
            <router-link :to="{ name: 'SignUp' }">
              <v-btn>
                Zarejestruj
              </v-btn>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'SignIn' }">
              <v-btn>
                Zaloguj
              </v-btn>
            </router-link>
          </li>
        </template>

        <template v-else>
          <li>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">
                  {{ currentEmail }}
                </v-btn>
              </template>
              <v-list>
                <template v-if="currentUser.role === 'instructor'">
                  <v-list-item>
                    <router-link :to="{ name: 'AddCourse' }">
                      <v-list-item-title>Dodaj kurs</v-list-item-title>
                    </router-link>
                  </v-list-item>
                </template>
                <v-list-item>
                  <router-link :to="{ name: 'UserProfile' }">
                    <v-list-item-title>Profil</v-list-item-title>
                  </router-link>
                </v-list-item>

                <template v-if="currentUser.role === 'admin'">
                  <v-list-item>
                    <router-link :to="{ name: 'UserManagement' }">
                      <v-list-item-title
                        >Zarządzanie użytkownikami</v-list-item-title
                      >
                    </router-link>
                  </v-list-item>
                </template>
              </v-list>
            </v-menu>
          </li>

          <li>
            <router-link :to="{ name: 'SignUp' }">
              <v-btn @click.prevent="logout">
                Wyloguj
              </v-btn>
            </router-link>
          </li>
        </template>
      </ul>
    </nav>
  </v-toolbar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push({ name: "Home" });
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    currentEmail() {
      return this.$store.getters.currentUser.email;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  height: 5vh;
}

ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  list-style: none;
  padding: 1vh;
}
li {
  flex-basis: 10%;
  margin: 0 8px;
}
a {
  text-decoration: none;
}
.name {
  color: blue;
}
</style>
