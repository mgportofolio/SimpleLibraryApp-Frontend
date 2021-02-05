import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Token: "",
    Role:"",
    UID:0,
    Book:{},
    IsLoading: false,
  },
  mutations: {
    setAuth(state,payload){
      state.Token = payload.Token;
      state.Role = payload.Role;
      state.UID =  payload.UserId;
    },
    setBook(state, payload){
      state.Book = payload;
    },
    setLoading(state, payload){
      state.IsLoading = payload;
    }
  },
  actions: {},
  modules: {}
});
