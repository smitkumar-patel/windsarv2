import React from 'react';
import BackArrow from 'react-native-vector-icons/MaterialIcons';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Colors from '../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {updateWinCoins} from '../redux/user/action';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserVouchers = ({navigation}) => {
  const {userVoucherData} = useSelector(state => state.user);
  const {userData} = useSelector(state => state.user);
  const dispatch = useDispatch();
  async function redeemVoucher(winCoins) {
    const user_id = await AsyncStorage.getItem('user_id');
    let response = await fetch(
      'https://windsar.herokuapp.com/registerCustomer/redeemVoucher/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          winCoins: winCoins,
        }),
      },
    );
    let recieveResponse = await response.json();

    if (recieveResponse.success == 'True') {
      alert('Promo code : A3G4H');
      dispatch(
        updateWinCoins({
          winCoins: -winCoins,
        }),
      );
    }
  }
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButtonStyle}>
          <BackArrow
            name="arrow-back"
            Icon
            style={{color: '#FFF'}}
            size={wp('6%')}
            onPress={() => navigation.goBack()}></BackArrow>
        </TouchableOpacity>

        <View style={styles.bottom}>
          <Text style={styles.text1}> Current Vouchers</Text>

          <ScrollView>
            <SafeAreaView>
              {userVoucherData && userVoucherData.length
                ? userVoucherData.map(userVoucherDataObj => (
                    <View key={userVoucherDataObj.id}>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            'Redeem Voucher',
                            'Are you confirm that do you want to redeem?',
                            [
                              {
                                text: 'Yes',
                                onPress: () => {
                                  if (
                                    userData.winCoins <
                                    userVoucherDataObj.winCoins
                                  ) {
                                    Alert.alert(
                                      'Message',
                                      'Not enough coins. Please collect coins ',
                                    );
                                  } else {
                                    redeemVoucher(userVoucherDataObj.winCoins);
                                  }
                                },
                              },

                              {
                                text: 'No',
                                onPress: () => {},
                              },
                            ],
                          )
                        }>
                        <View style={styles.section}>
                          <ImageBackground
                            source={{uri: userVoucherDataObj.image}}
                            style={styles.image}>
                            <Text style={styles.stext}>
                              {userVoucherDataObj.discount}
                            </Text>
                            <View style={styles.subSection}>
                              <Text style={styles.innertext}>
                                {userVoucherDataObj.subText}
                              </Text>
                            </View>
                            <Text style={styles.stext}>
                              WinCoins : {userVoucherDataObj.winCoins}
                            </Text>
                          </ImageBackground>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))
                : null}
            </SafeAreaView>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default UserVouchers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BLUE,
  },

  heading1: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#002456',
  },

  heading2: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#002456',
  },

  heading3: {
    fontSize: hp('2%'),
    fontWeight: '100',
    color: '#002456',
  },

  image: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    resizeMode: 'contain',
    opacity: 0.8,
    backgroundColor: 'black',
    height: hp('18%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  top: {
    flex: 0.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerImage: {
    width: 200,
    height: 200,
  },

  bottom: {
    flex: 1,
    backgroundColor: Colors.APP_BLUE,
    width: wp('100%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  text1: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#FECE05',
    marginTop: wp('04%'),
    marginBottom: wp('08%'),
  },

  section: {
    flex: 0.4,
    width: wp('85%'),
    marginBottom: 20,
  },

  iconContainer: {
    height: 100,
    left: 150,
    bottom: 80,
    justifyContent: 'space-evenly',
  },

  iconStyle: {
    backgroundColor: 'gold',
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: 'center',
  },

  backButtonStyle: {
    alignSelf: 'flex-start',
    marginLeft: wp('3%'),
    marginTop: 10,
    color: '#fff',
  },

  buttonContainer: {
    width: wp('85%'),
    height: wp('12%'),
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonStyling: {
    width: wp('36%'),
    backgroundColor: '#fff',
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  buttonStyling1: {
    width: wp('36%'),
    backgroundColor: '#B42D20',
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  buttonText: {
    textAlign: 'center',
  },

  stext: {
    fontSize: hp('2.7%'),
    fontWeight: 'bold',
    color: '#fff',
    marginTop: hp('0.2%'),
    textAlign: 'center',
  },

  subSection: {
    width: wp('64%'),
    height: 40,
    backgroundColor: '#FECE05',
    borderRadius: 30,
    justifyContent: 'center',
  },

  innertext: {
    fontStyle: 'normal',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#002456',
    textAlign: 'center',
  },
});
