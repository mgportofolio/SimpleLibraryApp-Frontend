<template>
  <div class="home">
    <Rent />
  </div>
</template>

<script>
// @ is an alias to /src
import Rent from "@/components/Rent.vue";

export default {
  name: "RentView",
  mounted() {
    console.log("From View: " + this.$route);
  },
  components: {
    Rent,
  },
};
</script>
