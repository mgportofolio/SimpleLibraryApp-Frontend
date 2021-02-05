<template>
  <div id="app">
    <Loading v-if="this.$store.state.IsLoading.IsLoading === true" />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="this.$store.state.Role === 'Admin'" to="/users"
        >Users</router-link
      >
      <span v-if="this.$store.state.Role === 'Admin'"> | </span>
      <router-link
        v-if="
          this.$store.state.Role !== '' &&
            this.$store.state.Role !== undefined &&
            this.$store.state.Role != null
        "
        to="/rent"
        >Rent</router-link
      >
      <span
        v-if="
          this.$store.state.Role !== '' &&
            this.$store.state.Role !== undefined &&
            this.$store.state.Role != null
        "
      >
        |
      </span>
      <router-link to="/about">About</router-link>
      <span
        v-if="
          this.$store.state.Role !== '' &&
            this.$store.state.Role !== undefined &&
            this.$store.state.Role != null
        "
        to="/about"
      >
        |
      </span>
      <button
        class="btn btn-outline-danger btn-sm"
        v-if="
          this.$store.state.Role !== '' &&
            this.$store.state.Role !== undefined &&
            this.$store.state.Role != null
        "
        v-on:click="logoutUser"
      >
        Logout
      </button>
    </div>
    <router-view />
  </div>
</template>
<script>
import Loading from "@/components/Loading.vue";

export default {
  name: "App",
  components: {
    Loading,
  },
  mounted() {
    this.$store.commit("setAuth", {
      Token: sessionStorage.getItem("token"),
      UserId: sessionStorage.getItem("uid"),
      Role: sessionStorage.getItem("role"),
    });
  },
  methods: {
    logoutUser() {
      this.$store.commit("setLoading", {
        IsLoading: true,
      });
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("uid");
      sessionStorage.removeItem("role");
      this.$store.commit("setAuth", {
        Token: "",
        UserId: 0,
        Role: "",
      });
      this.$store.commit("setLoading", {
        IsLoading: false,
      });
      if (this.$router.currentRoute.path !== "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
