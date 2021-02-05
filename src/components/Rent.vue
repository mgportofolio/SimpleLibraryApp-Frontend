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
      <div class="m-3 text-center"><h3>Rental List</h3></div>
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Book Name</th>
              <th scope="col">Status</th>
              <th scope="col">Rent At</th>
              <th scope="col">Returned At</th>
              <th scope="col" v-if="Role === 'User'">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rent, i) in Rents" :key="rent.RentId">
              <td>{{ i + 1 }}</td>
              <td>{{ rent.userName }}</td>
              <td>{{ rent.bookName }}</td>
              <td v-if="rent.status === true">Sudah Dikembalikan</td>
              <td v-if="rent.status === false">Belum Dikembalikan</td>
              <td>{{ rent.rentAt }}</td>
              <td v-if="rent.returnAt === null">Not Returned Yet</td>
              <td v-if="rent.returnAt !== null">{{ rent.returnedAt }}</td>
              <td v-if="Role === 'User'">
                <button
                  class="btn btn-outline-info btn-sm"
                  v-if="rent.status === false"
                  @click="returnBook(rent.rentId)"
                >
                  Return
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
  name: "Rent",
  data() {
    return {
      Rents: null,
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
    if (this.Role === "" || this.Role === undefined || this.Role === null) {
      this.$router.push("/");
    }
    this.viewRents();
  },
  methods: {
    viewRents() {
      this.$store.commit("setLoading", {
        IsLoading: true,
      });
      const headers = {
        Authorization: "Bearer " + this.$store.state.Token,
      };
      this.$http
        .get(process.env.VUE_APP_BASE_URI + "/api/v1/rent", {
          headers,
        })
        .then((response) => {
          if (response.data.status == false) {
            this.Message = response.data.message;
          }
          this.Message = response.data.message;
          this.Rents = response.data.data;
        })
        .catch((error) => {
          this.Message = this.Message = error.response.data.message;
        })
        .finally(() => {
          this.$store.commit("setLoading", {
            IsLoading: false,
          });
        });
    },

    returnBook(id) {
      this.$store.commit("setLoading", {
        IsLoading: true,
      });
      const headers = {
        Authorization: "Bearer " + this.$store.state.Token,
      };
      this.$http
        .put(
          process.env.VUE_APP_BASE_URI + "/api/v1/rent/" + id,
          {},
          {
            headers,
          }
        )
        .then((response) => {
          this.Message = response.data.message;
          this.viewRents();
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
