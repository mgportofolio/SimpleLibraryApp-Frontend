<template>
  <div class="home">
    <Book />
  </div>
</template>

<script>
// @ is an alias to /src
import Book from "@/components/Book.vue";

export default {
  name: "BookView",
  mounted() {
    console.log("From View: " + this.$route);
  },
  components: {
    Book,
  },
};
</script>
