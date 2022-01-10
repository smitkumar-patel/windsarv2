import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  PermissionsAndroid,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import CustomMapMarker from 'react-native-vector-icons/FontAwesome5';
import BarsButton from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {updateWinCoins, updateUserHistory} from '../redux/user/action';
import LoadingComponent from './LoadingComponent';
import Colors from '../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
const UserHomePage = ({route, navigation}) => {
  const {markerInfo} = useSelector(state => state.user);
  const {userLocation} = useSelector(state => state.user);
  const [locationPermission, setLocationPermission] = useState('unknown');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [permissionMessage, setPermissionMessage] = useState('Loading');
  const [markerKey, setMarkerKey] = useState(0);
  const [showMarker, setShowMarker] = useState(false);
  const [deviceLatLong, setDeviceLatLong] = useState({
    deviceLat: 0,
    deviceLong: 0,
  });
  const hasPermission = async () => {
    const granted = route.params.locationPermission;
    if (granted == PermissionsAndroid.RESULTS.GRANTED) {
      setDeviceLatLong({
        deviceLat: userLocation.deviceLat,
        deviceLong: userLocation.deviceLong,
      });
    } else if (granted == PermissionsAndroid.RESULTS.DENIED) {
      setPermissionMessage(
        'Location permission denied.\nReload application and allow location permission',
      );
    } else if (granted == PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      setPermissionMessage(
        'Location permission set to never ask again.\nIf it was a mistake, follow below steps.\n1->Press and hold on windsor application\ni->Manually allow location permission\nOr\nii->Goto storange and cache and clear storage and cache',
      );
    }
    setIsLoading(false);
    setLocationPermission(granted);
  };

  function setData(key) {
    setMarkerKey(key);
    setShowMarker(true);
  }
  async function coinsCollected() {
    if (markerInfo[markerKey].winCoins) {
      const user_id = await AsyncStorage.getItem('user_id');

      let response = await fetch(
        'https://windsarv2.herokuapp.com/locationVisited',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user_id,
            winCoins: markerInfo[markerKey].winCoins,
            markerKey: markerInfo[markerKey].markerKey,
          }),
        },
      );
      let recieveResponse = await response.json();

      if (recieveResponse.success == 'true') {
        markerInfo[markerKey].canCollect = false;
        setShowMarker(false);
        dispatch(
          updateWinCoins({
            winCoins: markerInfo[markerKey].winCoins,
            placeVisited: markerInfo[markerKey].name,
          }),
        );
        dispatch(
          updateUserHistory([
            {
              id: markerInfo[markerKey].markerKey,
              name: markerInfo[markerKey].name,
              time: moment().format('hh:mm a'),
              address: markerInfo[markerKey].address,
              visitedWhen: moment().format('YYYY-MM-DD'),
            },
          ]),
        );
        alert('Wincoins collected');
      } else {
        alert('Wincoins not found. Please try later');

        recieveResponse;
      }
    } else {
      alert('Can not find coins. Please try again!');
    }
  }
  function findCoordinates() {
    Geolocation.getCurrentPosition(
      position => {
        setDeviceLatLong({
          deviceLat: position.coords.latitude,
          deviceLong: position.coords.longitude,
        });
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 100000, maximumAge: 100000},
    );
  }
  useEffect(() => {
    hasPermission();
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        {isLoading ? (
          <LoadingComponent></LoadingComponent>
        ) : locationPermission == 'granted' ? (
          <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: deviceLatLong.deviceLat,
                longitude: deviceLatLong.deviceLong,
                latitudeDelta: 0.08,
                longitudeDelta: 0.02,
              }}>
              <MapView.Circle
                key={20}
                radius={1000}
                fillColor={'rgba(0, 0, 0, 0.3)'}
                center={{
                  latitude: deviceLatLong.deviceLat,
                  longitude: deviceLatLong.deviceLong,
                }}></MapView.Circle>
              <Marker
                coordinate={{
                  latitude: deviceLatLong.deviceLat,
                  longitude: deviceLatLong.deviceLong,
                }}
                key={0}
                pinColor="blue"
                title="Current location"
                onPress={() => setShowMarker(false)}></Marker>
              {markerInfo.map((values, index) => (
                <Marker
                  key={index}
                  tracksViewChanges={false}
                  coordinate={{
                    latitude: values.Lat,
                    longitude: values.Long,
                    latitudeDelta: 0.08,
                    longitudeDelta: 0.02,
                  }}
                  title={values.name}
                  onPress={object => {
                    setData(object._targetInst.return.key);
                  }}></Marker>
              ))}
            </MapView>
            <BarsButton
              name="bars"
              size={wp('7%')}
              style={styles.BarsButtonStyle}
              onPress={() => navigation.openDrawer()}
            />
            {showMarker && (
              <>
                <View style={styles.mainBox}>
                  <View style={styles.closeIcon}>
                    <TouchableOpacity onPress={() => setShowMarker(false)}>
                      <CloseIcon
                        name="close"
                        color="white"
                        size={30}></CloseIcon>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.displayInfoBox}>
                    <Text style={styles.boxHeading}>
                      {markerInfo[markerKey].name}
                    </Text>
                    <Text style={styles.boxAdress}>
                      {markerInfo[markerKey].address}
                    </Text>

                    <Text style={styles.boxDescription}>
                      {markerInfo[markerKey].description}
                    </Text>
                    <Text style={styles.boxCoinsText}>Collectable coins</Text>
                    <Text style={styles.boxWincoins}>
                      {markerInfo[markerKey].winCoins}
                    </Text>
                    <Image
                      style={{height: 100, width: 250, marginTop: hp('2%')}}
                      source={{uri: markerInfo[markerKey].imagelink}}></Image>
                  </View>
                  {markerInfo[markerKey].canCollect ? (
                    markerInfo[markerKey].isInRange ? (
                      <View style={styles.boxCollectButton}>
                        <TouchableOpacity onPress={coinsCollected}>
                          <Text style={styles.boxCollectCoinsText}>
                            Collect coins
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={styles.boxCollectButton2}>
                        <Text style={styles.boxCollectCoinsText2}>
                          Not in range
                        </Text>
                      </View>
                    )
                  ) : (
                    <View style={styles.boxCollectButton2}>
                      <Text style={styles.boxCollectCoinsText2}>
                        Coins collected
                      </Text>
                    </View>
                  )}
                </View>
              </>
            )}
          </View>
        ) : (
          <View style={styles.permissionError}>
            <Text style={{textAlign: 'center'}}>{permissionMessage}</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default UserHomePage;

const styles = StyleSheet.create({
  BarsButtonStyle: {
    position: 'absolute',
    color: 'black',
    paddingTop: hp('2%'),
    paddingLeft: hp('2%'),
  },
  boxCollectButton: {
    marginBottom: hp('4%'),
    marginTop: 'auto',
    borderRadius: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'gold',
    height: hp('5%'),
    width: wp('40%'),
  },
  boxCollectButton2: {
    marginBottom: hp('4%'),
    marginTop: 'auto',
    borderRadius: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(224, 204, 148,1)',
    height: hp('5%'),
    width: wp('40%'),
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  boxHeading: {
    fontSize: hp('2.7%'),
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  boxAdress: {
    paddingTop: hp('0.4%'),
    fontSize: hp('2.3%'),
    color: 'rgba(255, 255, 255, 1)',
  },
  boxCoinsText: {
    fontSize: hp('2.3%'),
    color: 'rgba(255, 255, 255, 1)',
    paddingTop: hp('10%'),
  },
  boxWincoins: {
    fontSize: hp('2.8%'),
    fontWeight: 'bold',
    color: 'gold',
  },
  boxCollectCoinsText: {
    fontSize: hp('2.8%'),
    fontWeight: 'bold',
    color: Colors.APP_BLUE,
  },
  boxCollectCoinsText2: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: Colors.APP_BLUE,
  },
  boxDescription: {
    paddingTop: hp('1%'),
    paddingLeft: wp('9%'),
    paddingRight: wp('9%'),
    textAlign: 'justify',
    fontSize: hp('2.2'),
    color: 'rgba(255, 255, 255, 1)',
  },
  permissionError: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayInfoBox: {
    paddingTop: hp('7%'),
    position: 'absolute',
    alignItems: 'center',
  },
  mainBox: {
    margin: hp('4%'),
    borderRadius: hp('6%'),
    height: hp('85%'),
    width: wp('85%'),
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  closeIcon: {
    margin: hp('2%'),
    alignSelf: 'flex-end',
  },
});
