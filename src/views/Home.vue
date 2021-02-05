<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <div
      v-if="
        this.$store.state.Token === '' ||
          this.$store.state.Token === null ||
          this.$store.state.Token === undefined
      "
    >
      <Login />
    </div>
    <div
      v-if="
        this.$store.state.Token !== '' &&
          this.$store.state.Token !== null &&
          this.$store.state.Token !== undefined
      "
    >
      <Books />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
import Books from "@/components/Books.vue";

export default {
  name: "Home",
  mounted() {
    this.$store.commit("setAuth", {
      Token: sessionStorage.getItem("token"),
      UserId: sessionStorage.getItem("uid"),
      Role: sessionStorage.getItem("role"),
    });
    console.log(this.$store.state.Role);
  },
  components: {
    Login,
    Books,
  },
};
</script>
