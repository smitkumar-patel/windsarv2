import * as actionTypes from './type';

const intialState = {
  businessVoucherData: [],
  imageData: null,
  businessData: {},
};

const businessReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BUSINESS_VOUCHER_DATA:
      return {
        ...state,
        businessVoucherData: [...action.payload],
      };
    case actionTypes.UPDATE_BUSINESS_VOUCHER_DATA:
      return {
        ...state,
        businessVoucherData: [...state.businessVoucherData, ...action.payload],
      };
    case actionTypes.SET_BUSINESS_IMAGE_DATA:
      return {
        ...state,
        imageData: action.payload,
      };
    case actionTypes.SET_BUSINESS_DATA:
      return {
        ...state,
        businessData: {...state.businessData, ...action.payload},
      };
    default:
      return {...state};
  }
};

export default businessReducer;
