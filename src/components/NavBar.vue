<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'Login' }">
          Zaloguj
        </router-link>
      </li>

      <li><a href="/register">Zarejestruj</a></li>
    </ul>
  </nav>
</template>

<script>
// import axios from "axios";

export default {
  name: "NavBar",
  data() {
    return {
      courses: []
    };
  }
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
</style>
