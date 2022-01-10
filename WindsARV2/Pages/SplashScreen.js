import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  Text,
  PermissionsAndroid,
} from 'react-native';
import {getDistance} from 'geolib';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Resources from '../utils/Resources';
import {useDispatch, useSelector} from 'react-redux';
import {
  setUserLocation,
  updateBusinessData,
  updateUserHistory,
} from '../redux/user/action';
import {setBusinessVoucherData, updateMarkerData} from '../redux/user/action';
const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {markerInfo} = useSelector(state => state.user);
  const {userLocation} = useSelector(state => state.user);
  const [deviceLatLong, setDeviceLatLong] = useState(null);
  const [locationPermission, setlocationPermission] = useState(null);
  const [markerData, setMarkerData] = useState([]);
  useEffect(() => {
    checkIfLogged();
  }, []);

  const checkIfLogged = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const isLogged = await AsyncStorage.getItem('isLogged');
    if (isLogged != null && isLogged == 'true') {
      const userType = await AsyncStorage.getItem('userType');
      if (userType == 'customer') {
        const locationPermission = await requestLocationPermission();
        setlocationPermission(locationPermission);
        if (locationPermission == 'granted') {
          findCoordinates();
        } else {
          navigation.navigate('UserHomePage', {locationPermission});
        }
      } else if (userType == 'bussiness') {
        let response = await fetch('http://localhost:3000/businessInfo', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({user_id: user_id}),
        });
        let recievedReponse = await response.json();
        dispatch(
          updateBusinessData({
            name: recievedReponse.name,
            email: recievedReponse.email,
          }),
        );
        getBusinessVoucherData();
      }
    } else {
      navigation.navigate('Welcome');
    }
  };
  async function getBusinessVoucherData() {
    const user_id = await AsyncStorage.getItem('user_id');
    let response = await fetch('http://localhost:3000/getVoucherData', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: user_id}),
    });
    let recievedReponse = await response.json();
    let xyz = [];
    recievedReponse.forEach(element => {
      let discountPrice =
        ((element.actualPrice - element.discountPrice) * 100) /
        element.actualPrice;
      let discount =
        Math.floor(discountPrice) +
        '%' +
        ' off on ' +
        element.productName +
        ' by ' +
        element.name;
      let subText = 'Expires on ' + element.expiryDate;
      element.discount = discount;
      element.subText = subText;
      element.image =
        'https://media.blogto.com/articles/20210122-hong-shing.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70';
      xyz.push(element);
    });
    dispatch(setBusinessVoucherData(xyz));
    navigation.navigate('BussinessHomePage');
  }
  async function getMarkerInfo(lat, long) {
    let response = await fetch('http://localhost:3000/getMarkerInfo', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    let recievedReponse = await response.json();
    let tempMarker = [...recievedReponse];

    const user_id = await AsyncStorage.getItem('user_id');
    let response2 = await fetch(
      'http://localhost:3000/getCustoemerLocationHistory',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
        }),
      },
    );
    let recieveResponse2 = await response2.json();
    dispatch(updateUserHistory(recieveResponse2));

    tempMarker.map(value => {
      value.canCollect = true;
    });

    tempMarker.map(value => {
      recieveResponse2.map(value2 => {
        if (value.name == value2.name) {
          value.canCollect = false;
        }
      });
    });

    tempMarker.map(value => {
      value.isInRange =
        getDistance(
          {latitude: lat, longitude: long},
          {latitude: value.Lat, longitude: value.Long},
        ) < 1000
          ? true
          : false;
    });
    dispatch(updateMarkerData([...tempMarker]));
    navigation.navigate('UserHomePage', {locationPermission: 'granted'});
  }
  function findCoordinates() {
    Geolocation.getCurrentPosition(
      position => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        getMarkerInfo(lat, long);
        dispatch(setUserLocation({deviceLat: lat, deviceLong: long}));
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 100000, maximumAge: 100000},
    );
  }
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted;
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={{height: '16%', width: '75%'}}
          source={Resources.APP_LOGO2}></Image>
        <Image source={Resources.JUMPING_BIRD}></Image>
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(51,51,51,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
