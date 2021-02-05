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
        <div class="text-right">
          <button
            class="btn btn-outline-info btn-sm"
            @click="createBook"
            v-if="this.Role === 'Admin'"
          >
            Create Book
          </button>
        </div>
        <br />
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Genre</th>
              <th scope="col">Author</th>
              <th scope="col">Description</th>
              <th scope="col">Availability</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, i) in Books" :key="book.bookId">
              <td>{{ i + 1 }}</td>
              <td>{{ book.bookName }}</td>
              <td>{{ book.bookGenre }}</td>
              <td>{{ book.authorName }}</td>
              <td>{{ book.bookDescription }}</td>
              <td v-if="book.availability === true">Available</td>
              <td v-if="book.availability === false">Not Available</td>
              <td>
                <button
                  class="btn btn-outline-info btn-sm"
                  v-if="Role === 'Admin'"
                  @click="editBook(book.bookId)"
                >
                  Edit
                </button>
                <button
                  class="btn btn-outline-info btn-sm"
                  v-if="Role === 'User' && book.availability === true"
                  @click="rentBook(book.bookId)"
                >
                  Rent
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
  name: "Books",
  data() {
    return {
      Books: null,
      Role: "",
      Message: "",
      Status: true,
    };
  },
  mounted() {
    this.viewBooks();
    this.$store.commit("setBook", {
      Book: {},
    });
    this.Role = this.$store.state.Role;
  },
  methods: {
    viewBooks() {
      this.$store.commit("setLoading", {
        IsLoading: true,
      });
      const headers = {
        Authorization: "Bearer " + this.$store.state.Token,
      };
      this.$http
        .get(process.env.VUE_APP_BASE_URI + "/api/v1/book", {
          headers,
        })
        .then((response) => {
          if (response.data.status == false) {
            this.Message = response.data.message;
          }
          this.Message = response.data.message;
          this.Books = response.data.data;
        })
        .catch((error) => (this.Message = error.response.data.message))
        .finally(() => {
          this.$store.commit("setLoading", {
            IsLoading: false,
          });
        });
    },

    rentBook(id) {
      this.$store.commit("setLoading", {
        IsLoading: true,
      });
      const headers = {
        Authorization: "Bearer " + this.$store.state.Token,
      };
      this.$http
        .post(
          process.env.VUE_APP_BASE_URI + "/api/v1/rent",
          { bookId: id },
          {
            headers,
          }
        )
        .then((response) => {
          this.Message = response.data.message;
          this.viewBooks();
        })
        .catch((error) => (this.Message = error.response.data.message))
        .finally(() => {
          this.$store.commit("setLoading", {
            IsLoading: false,
          });
        });
    },

    editBook(id) {
      var filteredBook = this.Books.filter((book) => {
        return book.BookId === id;
      });
      this.$store.commit("setBook", {
        Book: filteredBook,
      });
      this.$router.push("/book/" + id);
    },

    createBook() {
      this.$router.push("/book");
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
