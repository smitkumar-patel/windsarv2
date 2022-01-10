import * as actionTypes from './type';

const initialState = {
  userData: {},
  userVoucherData: [],
  markerInfo: [],
  userHistory: [],
  pagesStatus: {
    profileIsLoading: true,
    vouchersIsLoading: true,
    historyIsLoading: true,
  },
  imageData: null,
  userLocation: {deviceLat: 0, deviceLong: 0},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_LOCATION:
      return {
        ...state,
        userLocation: {
          deviceLat: action.payload.deviceLat,
          deviceLong: action.payload.deviceLong,
        },
      };
    case actionTypes.SET_USER_DATA:
      return {...state, userData: {...state.userData, ...action.payload}};
    case actionTypes.UPDATE_WIN_COINS:
      return {
        ...state,
        userData: {
          ...state.userData,
          winCoins:
            Number(state.userData.winCoins) + Number(action.payload.winCoins),
          placeVisited: Number(state.userData.placeVisited) + 1,
        },
      };
    case actionTypes.SET_USER_VOUCHER_DATA:
      return {
        ...state,
        userVoucherData: [...action.payload],
      };
    case actionTypes.SET_MARKERINFO:
      return {
        ...state,
        markerInfo: [...action.payload],
      };
    case actionTypes.SET_USER_HISTORY:
      return {
        ...state,
        userHistory: [...action.payload],
      };
    case actionTypes.UPDATE_USER_HISTORY:
      return {
        ...state,
        userHistory: [...state.userHistory, ...action.payload],
      };
    case actionTypes.SET_USER_PAGES_ISLOADING:
      return {
        ...state,
        pagesStatus: {...state.pagesStatus, ...action.payload},
      };
    case actionTypes.SET_USER_IMAGE_DATA:
      return {
        ...state,
        imageData: action.payload,
      };
    default:
      return {...state};
  }
};

export default userReducer;
