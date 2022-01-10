import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {
  updateUserData,
  updateUserHistory,
  updateVoucherData,
  updateUserDataIsLoading,
} from '../redux/user/action';
import Colors from '../utils/Colors';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const UserMenuContent = ({navigation}) => {
  const {userData} = useSelector(state => state.user);
  const {pagesStatus} = useSelector(state => state.user);
  const {imageData} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const {userVoucherData} = useSelector(state => state.user);
  useEffect(() => {
    getAllData();
  }, []);
  const getAllData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    getUserData(user_id);
    getVouchersData();
  };
  const getUserData = async user_id => {
    let response = await fetch('http://localhost:3000/customerInfo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    });
    let recieveResponse = await response.json();
    dispatch(
      updateUserData({
        name: recieveResponse.name,
        age: recieveResponse.age,
        winCoins: recieveResponse.winCoins,
        placeVisited: recieveResponse.placeVisited,
        email: recieveResponse.email,
        vouchers: recieveResponse.vouchers,
      }),
    );
    dispatch(
      updateUserDataIsLoading({
        profileIsLoading: false,
      }),
    );
  };
  const getVouchersData = async () => {
    let response = await fetch('http://localhost:3000/getVoucherDataForUser', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
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
        element.businessName;
      let subText = 'Expires on ' + element.expiryDate;
      element.discount = discount;
      element.subText = subText;
      element.image =
        'https://media.blogto.com/articles/20210122-hong-shing.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70';
      xyz.push(element);
    });

    dispatch(updateVoucherData(xyz));
  };
  const logoutUser = async () => {
    await AsyncStorage.clear().then(navigation.navigate('Navigator'));
  };
  return (
    <>
      {pagesStatus.profileIsLoading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Fetching data</Text>
        </View>
      ) : (
        <>
          <View style={styles.half1}>
            <View style={styles.imagePointBoxStyle}>
              <TouchableOpacity onPress={() => getImage()}>
                {imageData == null ? (
                  <Image
                    style={styles.imageStyle}
                    source={require('../Images/black.jpg')}></Image>
                ) : (
                  <Image
                    style={styles.imageStyle}
                    source={{uri: imageData}}></Image>
                )}
              </TouchableOpacity>
              <View style={styles.textWinCoinsGroup}>
                <Text style={styles.textWinCoins}>{userData.winCoins}</Text>
                <Text style={styles.textWinCoins2}>WINCOINS</Text>
              </View>
            </View>
            <Text style={styles.text2}>Hi, {userData.name}</Text>
          </View>

          <View style={styles.half2}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfilePage')}>
              <Text style={styles.text}>Profile</Text>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserVouchers')}>
              <Text style={styles.text}>Voucher</Text>
            </TouchableOpacity>

            <View style={styles.line}></View>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserLocationHistory')}>
              <Text style={styles.text}>My History</Text>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <TouchableOpacity onPress={() => navigation.navigate('UserHelp')}>
              <Text style={styles.text}>Get Help</Text>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <TouchableOpacity onPress={logoutUser}>
              <Text style={styles.text}>Log out</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  half1: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.25,
    backgroundColor: 'gold',
    borderBottomRightRadius: hp('5%'),
    borderBottomLeftRadius: hp('5%'),
  },
  half2: {
    flex: 0.75,
    marginTop: hp('7%'),
    alignItems: 'center',
  },
  text: {
    fontSize: hp('2.7%'),
    color: Colors.APP_BLUE,
  },
  text2: {
    fontSize: hp('2.3%'),
    color: 'black',
  },
  textWinCoinsGroup: {
    paddingLeft: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWinCoins: {
    fontSize: hp('2.7%'),
    color: 'gold',
    fontWeight: 'bold',
  },
  textWinCoins2: {
    fontSize: hp('1.5%'),
    color: 'white',
    fontWeight: 'bold',
  },

  line: {
    marginTop: hp('2.6%'),
    marginBottom: hp('2.6%'),
    height: hp('0.25%'),
    width: wp('60%'),
    backgroundColor: Colors.APP_BLUE,
  },
  imagePointBoxStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    height: hp('10%'),
    width: wp('50%'),
    borderRadius: hp('10%'),
    backgroundColor: Colors.APP_BLUE,
  },
  imageStyle: {
    height: hp('10%'),
    width: wp('20%'),
    borderRadius: hp('10%'),
  },
});
export default UserMenuContent;
