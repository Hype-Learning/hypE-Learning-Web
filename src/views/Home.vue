<template>
  <div class="home">
    <NavBar />
    <CourseList />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import CourseList from "@/components/CourseList.vue";

export default {
  name: "Home",
  components: {
    NavBar,
    CourseList
  }
};
</script>
