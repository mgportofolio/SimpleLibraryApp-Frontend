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
      <div class="m-3 text-center"><h3>BookList</h3></div>
      <div class="card-body">
        <div class="form-group m-2">
          <label class="text- font-weight-bold text-left"
            >Book Name<span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control"
            autocomplete="on"
            placeholder="Book Name"
            v-model="Book.bookName"
          />
        </div>
        <br />
        <div class="form-group m-2">
          <label class="text- font-weight-bold text-left"
            >Book Genre<span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control"
            autocomplete="on"
            placeholder="Book Genre"
            v-model="Book.bookGenre"
          />
        </div>
        <br />
        <div class="form-group m-2">
          <label class="text- font-weight-bold text-left"
            >Author Name<span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control"
            autocomplete="on"
            placeholder="Author Name"
            v-model="Book.authorName"
          />
        </div>
        <br />
        <div class="form-group m-2">
          <label class="text- font-weight-bold text-left"
            >Book Description<span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control"
            autocomplete="on"
            placeholder="Book Description"
            v-model="Book.bookDescription"
          />
        </div>
        <br />
        <div class="form-group m-2">
          <p><span class="text-danger">* Wajib Diisi</span></p>
          <button
            class="form-control btn btn-primary"
            @click="addBook"
            v-if="IsAdd === true"
          >
            Add Book
          </button>
          <button
            class="form-control btn btn-primary"
            @click="updateBook"
            v-if="IsAdd === false"
          >
            Update Book
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Book",
  data() {
    return {
      Book: {
        bookName: "",
        bookId: 0,
        bookDescription: "",
        bookGenre: "",
        authorName: "",
      },
      Role: "",
      Message: "",
      Id: 0,
      IsAdd: true,
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

    this.Id = this.$route.params.id;
    if (this.Id === undefined || this.Id === null) {
      this.IsAdd = true;
    } else {
      this.IsAdd = false;
    }

    if (
      (this.$store.Book === undefined ||
        this.$store.Book === {} ||
        this.$store.Book === null) &&
      this.IsAdd === false
    ) {
      this.getBook();
    } else if (
      this.$store.Book !== undefined &&
      this.$store.Book !== {} &&
      this.$store.Book !== null &&
      this.IsAdd === false
    ) {
      this.Book = this.$store.Book;
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
  },
  methods: {
    getBook() {
      this.$store.commit("setLoading", {
        IsLoading: true,
      });
      const headers = {
        Authorization: "Bearer " + this.$store.state.Token,
      };
      this.$http
        .get(process.env.VUE_APP_BASE_URI + "/api/v1/book/" + this.Id, {
          headers,
        })
        .then((response) => {
          if (response.data.status == false) {
            this.Message = response.data.message;
          }
          this.Book = response.data.data;
        })
        .catch((error) => (this.Message = error.response.data.message))
        .finally(() => {
          this.$store.commit("setLoading", {
            IsLoading: false,
          });
        });
    },
    validateBook() {
      var isBookValid = true;
      if (this.Book === {} || this.Book === undefined || this.Book === null) {
        isBookValid = false;
      }

      if (isBookValid) {
        if (
          this.Book.authorName === "" ||
          this.Book.authorName === undefined ||
          this.Book.authorName === null
        ) {
          isBookValid = false;
        }
        if (
          this.Book.bookDescription === "" ||
          this.Book.bookDescription === undefined ||
          this.Book.bookDescription === null
        ) {
          isBookValid = false;
        }
        if (
          this.Book.bookName === "" ||
          this.Book.bookName === undefined ||
          this.Book.bookName === null
        ) {
          isBookValid = false;
        }
        if (
          this.Book.bookGenre === "" ||
          this.Book.bookGenre === undefined ||
          this.Book.bookGenre === null
        ) {
          isBookValid = false;
        }
      }
      return isBookValid;
    },
    addBook() {
      this.Message = "";
      var isBookValid = this.validateBook();
      if (!isBookValid) {
        this.Message = "Data buku tidak valid";
      }
      if (isBookValid) {
        this.$store.commit("setLoading", {
          IsLoading: true,
        });
        const headers = {
          Authorization: "Bearer " + this.$store.state.Token,
        };
        this.$http
          .post(
            process.env.VUE_APP_BASE_URI + "/api/v1/book",
            {
              authorName: this.Book.authorName,
              bookDescription: this.Book.bookDescription,
              bookGenre: this.Book.bookGenre,
              bookName: this.Book.bookName,
            },
            {
              headers,
            }
          )
          .then((response) => {
            this.Message = response.data.message;
            this.Book = {
              bookName: "",
              bookId: 0,
              bookDescription: "",
              bookGenre: "",
              authorName: "",
            };
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

    updateBook() {
      this.Message = "";
      var isBookValid = this.validateBook();
      if (!isBookValid) {
        this.Message = "Data buku tidak valid";
      }
      if (isBookValid) {
        this.$store.commit("setLoading", {
          IsLoading: true,
        });
        const headers = {
          Authorization: "Bearer " + this.$store.state.Token,
        };
        this.$http
          .put(
            process.env.VUE_APP_BASE_URI + "/api/v1/book/" + this.Id,
            {
              authorName: this.Book.authorName,
              bookDescription: this.Book.bookDescription,
              bookGenre: this.Book.bookGenre,
              bookId: this.Book.bookId,
              bookName: this.Book.bookName,
            },
            {
              headers,
            }
          )
          .then((response) => {
            this.Message = response.data.message;
          })
          .catch((error) => (this.Message = error.response.data.message))
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
</style>
