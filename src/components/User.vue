<template>
  <div class="container">
    <div
      v-if="Message != ''"
      class="alert alert-info alert-dismissible fade show"
      role="alert"
    >
      {{ Message }}
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="card p-2">
      <div class="m-3 text-center"><h3>User Management</h3></div>
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Roles</th>
              <th scope="col" v-if="Role === 'Admin'">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, i) in Users" :key="user.userId">
              <td>{{ i + 1 }}</td>
              <td>{{ user.userName }}</td>
              <td>{{ user.roles }}</td>
              <td v-if="Role === 'Admin'">
                <button
                  class="btn btn-outline-info btn-sm"
                  v-if="user.roles !== 'Admin'"
                  @click="makeAdmin(user.userId)"
                >
                  Make Admin
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      Users: null,
      Role: "",
      Message: "",
      Status: true,
    };
  },
  mounted() {
    if (this.$store.state.Token === "" || this.$store.state.Token === null) {
      this.$store.commit("setAuth", {
        Token: sessionStorage.getItem("token"),
        UserId: sessionStorage.getItem("uid"),
        Role: sessionStorage.getItem("role"),
      });
    }
    this.Role = this.$store.state.Role;
    if (
      this.Role === "User" ||
      this.Role === "" ||
      this.Role === undefined ||
      this.Role === null
    ) {
      this.$router.push("/");
    }
    this.viewUsers();
  },
  methods: {
    viewUsers() {
      this.$store.commit("setLoading", {
        IsLoading: true,
      });
      const headers = {
        Authorization: "Bearer " + this.$store.state.Token,
      };
      this.$http
        .get(process.env.VUE_APP_BASE_URI + "/api/v1/user", {
          headers,
        })
        .then((response) => {
          if (response.data.status == false) {
            this.Message = response.data.message;
          }
          this.Message = response.data.message;
          this.Users = response.data.data;
        })
        .catch((error) => (this.Message = error.response.data.message))
        .finally(() => {
          this.$store.commit("setLoading", {
            IsLoading: false,
          });
        });
    },

    makeAdmin(id) {
      this.$store.commit("setLoading", {
        IsLoading: true,
      });
      const headers = {
        Authorization: "Bearer " + this.$store.state.Token,
      };
      this.$http
        .put(
          process.env.VUE_APP_BASE_URI + "/api/v1/auth/" + id,
          {},
          {
            headers,
          }
        )
        .then((response) => {
          this.Message = response.data.message;
          this.viewUsers();
        })
        .catch((error) => (this.Message = error.response.data.message))
        .finally(() => {
          this.$store.commit("setLoading", {
            IsLoading: false,
          });
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
