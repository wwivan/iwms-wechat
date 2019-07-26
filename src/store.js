import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const state ={
  isshow:false,
  toshow:false,
  fid: '42dd7498-b9d3-43b3-b736-3e9844f03ff5'
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
  },
  fid: state => {
    return state.fid;
  },
}
const vuex = new Vuex.Store({
  state,
  mutations,
  getters,
});
export default vuex
