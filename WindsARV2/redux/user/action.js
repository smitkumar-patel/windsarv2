import * as actionTypes from './type';

export const updateUserData = payload => dispatch => {
  dispatch({
    type: actionTypes.SET_USER_DATA,
    payload: payload,
  });
};

export const updateWinCoins = coins => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_WIN_COINS,
    payload: coins,
  });
};

export const updateVoucherData = vouchers => dispatch => {
  dispatch({
    type: actionTypes.SET_USER_VOUCHER_DATA,
    payload: vouchers,
  });
};

export const updateMarkerData = markers => dispatch => {
  dispatch({
    type: actionTypes.SET_MARKERINFO,
    payload: markers,
  });
};

export const setUserHistory = history => dispatch => {
  dispatch({
    type: actionTypes.SET_USER_HISTORY,
    payload: history,
  });
};

export const updateUserHistory = history => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_USER_HISTORY,
    payload: history,
  });
};

export const updateUserDataIsLoading = status => dispatch => {
  dispatch({
    type: actionTypes.SET_USER_PAGES_ISLOADING,
    payload: status,
  });
};

export const setBusinessVoucherData = voucher => dispatch => {
  dispatch({
    type: actionTypes.SET_BUSINESS_VOUCHER_DATA,
    payload: voucher,
  });
};

export const updateBusinessVoucherData = voucher => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_BUSINESS_VOUCHER_DATA,
    payload: voucher,
  });
};

export const setUserImageData = image => dispatch => {
  dispatch({
    type: actionTypes.SET_USER_IMAGE_DATA,
    payload: image,
  });
};

export const setBusinessImageData = image => dispatch => {
  dispatch({
    type: actionTypes.SET_BUSINESS_IMAGE_DATA,
    payload: image,
  });
};
export const updateBusinessData = data => dispatch => {
  dispatch({
    type: actionTypes.SET_BUSINESS_DATA,
    payload: data,
  });
};
export const setUserLocation = data => dispatch => {
  dispatch({
    type: actionTypes.SET_USER_LOCATION,
    payload: data,
  });
};
