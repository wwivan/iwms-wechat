const getters = {
  good: state => {
    return state.good;
  },
  orderGood: state => {
    return state.orderGood;
  },
  addressList: state => {
    return state.addressList;
  },
  editAddress: state => {
    return state.editAddress;
  },
  addressId: state => {
    return state.addressId;
  },
  fid: state => {
    return state.fid;
  },
  isshow: state => {
    return state.isshow;
  }
};
export default getters;
