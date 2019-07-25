import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const state ={
  isshow:false,
  toshow:false,
}
const mutations = {
  resIsshow(state) {
    return state.isshow = true
  },
  stockInIsshow(state) {
    return state.isshow = false
  },
  toshowOpen(state){
    return state.toshow =true
  },
  toshowClose(state){
    return state.toshow = false
  }
}
const getters={
  isshow: state =>{
    return state.isshow
  },
  toshow: state =>{
    return state.isshow
  }
}
const vuex = new Vuex.Store({
  state,
  mutations,
  getters,
});
export default vuex
