<template>
  <nav>
    <ul>
      <template v-if="!currentUser">
        <li>
          <router-link :to="{ name: 'SignIn' }">
            Zaloguj
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'SignUp' }">
            Zarejestruj
          </router-link>
        </li>
      </template>

      <template v-else>
        <li>
          <p class="name">{{ currentEmail }}</p>
        </li>

        <li>
          <a href="#" @click.prevent="logout">Wyloguj</a>
        </li>
      </template>
    </ul>
  </nav>
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
    currentEmail() {
      return this.$store.getters.currentEmail;
    },
    currentUser() {
      return this.$store.getters.currentUser;
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
}
a {
  text-decoration: none;
}
.name {
  color: blue;
}
</style>
