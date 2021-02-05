<template>
  <div class="home">
    <Users />
  </div>
</template>

<script>
// @ is an alias to /src
import Users from "@/components/User.vue";

export default {
  name: "UsersView",
  components: {
    Users,
  },
};
</script>
