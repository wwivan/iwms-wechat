const mutations = {
  // [types.SET_GOOD_MUTATION](state, payload) {
  //   state.good = payload;
  // },
  // [types.SET_ORDERGOOD_MUTATION](state, payload) {
  //   state.orderGood = payload;
  // },
  // [types.SET_ADDRESSLIST_MUTATION](state, payload) {
  //   state.addressList = payload;
  // },
  // [types.SET_EDITADDRESS_MUTATION](state, payload) {
  //   state.editAddress = payload;
  // },
  // [types.SET_ADDRESSID_MUTATION](state, payload) {
  //   state.addressId = payload;
  // },
  resIsshow(state) {
    return (state.isshow = true);
  },
  stockInIsshow(state) {
    return (state.isshow = false);
  }
};

export default mutations;
