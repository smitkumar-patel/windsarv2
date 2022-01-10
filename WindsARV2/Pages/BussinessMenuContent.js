import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import UserHomePage from './UserHomePage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
const BussinessMenuContent = ({navigation}) => {
  const {businessVoucherData} = useSelector(state => state.business);
  const {imageData} = useSelector(state => state.business);
  const {businessData} = useSelector(state => state.business);
  const logoutBusiness = async () => {
    await AsyncStorage.clear().then(navigation.navigate('Navigator'));
  };
  return (
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
            <Text style={styles.textWinCoins}>
              {businessVoucherData.length}
            </Text>
            <Text style={styles.textWinCoins2}>Vouchers</Text>
          </View>
        </View>
        <Text style={styles.text2}>Hi, {businessData.name}</Text>
      </View>

      <View style={styles.half2}>
        <TouchableOpacity
          onPress={() => navigation.navigate('BussinessVouchers')}>
          <Text style={styles.text}>Voucher</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TouchableOpacity onPress={logoutBusiness}>
          <Text style={styles.text}>Log out</Text>
        </TouchableOpacity>
      </View>
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
export default BussinessMenuContent;
