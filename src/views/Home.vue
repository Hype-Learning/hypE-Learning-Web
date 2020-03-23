<template>
  <div class="home">
    <CourseList />
  </div>
</template>

<script>
// @ is an alias to /src
import CourseList from "@/components/CourseList.vue";

export default {
  name: "Home",
  components: {
    CourseList
  }
};
</script>
