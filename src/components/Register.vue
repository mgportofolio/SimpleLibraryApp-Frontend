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
      <div class="m-3 text-center"><h3>Register</h3></div>
      <div class="card-body">
        <div class="form-group m-2 text-left">
          <label class="text- font-weight-bold text-left"
            >Username<span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control"
            autocomplete="on"
            placeholder="Username"
            v-model="Username"
          />
        </div>
        <br />

        <div class="form-group m-2 text-left">
          <label class="font-weight-bold"
            >Password<span class="text-danger">*</span></label
          >
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="Password"
          />
        </div>

        <div class="form-group m-2">
          <br />
          <p><span class="text-danger">* Wajib Diisi</span></p>
          <button class="form-control btn btn-success" @click="registerUser">
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      Username: "",
      Password: "",
      Message: "",
      Status: true,
    };
  },
  mounted() {
    this.$store.commit("setLoading", {
      IsLoading: false,
    });
  },
  methods: {
    registerUser() {
      this.Message = "";
      this.$store.commit("setLoading", {
        IsLoading: true,
      });
      var flag = 0;
      var isUsernameEmpty = false;
      var isPasswordEmpty = false;
      if (
        this.Username === "" ||
        this.Username == undefined ||
        this.Username == null
      ) {
        isUsernameEmpty = true;
        flag = 1;
      }
      if (
        this.Password === "" ||
        this.Password == undefined ||
        this.Password == null
      ) {
        isPasswordEmpty = true;
        flag = 1;
      }

      if (isUsernameEmpty && isPasswordEmpty) {
        this.Message = "Username and Password are required";
      } else if (isUsernameEmpty) {
        this.Message = "Username is required";
      } else if (isPasswordEmpty) {
        this.Message = "Password is required";
      }

      if (isUsernameEmpty || isPasswordEmpty) {
        this.$store.commit("setLoading", {
          IsLoading: false,
        });
      }

      if (flag === 0) {
        this.$http
          .post(process.env.VUE_APP_BASE_URI + "/api/v1/user", {
            username: this.Username,
            userpassword: this.Password,
          })
          .then((response) => {
            this.Message = response.data.message;
          })
          .catch((error) => {
            this.Message = error.response.data.message;
          })
          .finally(() => {
            this.$store.commit("setLoading", {
              IsLoading: false,
            });
          });
      }
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

.text-left {
  text-align: left;
}
</style>
