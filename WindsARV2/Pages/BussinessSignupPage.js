import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import BackArrow from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../utils/Colors';
import BusinessSignupComponent from '../SubPages/BussinessSignupComponent';
const BusinessSignupPage = ({navigation}) => {
  return (
    <>
      <View style={{flex: 0.1, backgroundColor: 'white', flexDirection: 'row'}}>
        <BackArrow
          name="arrow-back"
          size={wp('8%')}
          style={styles.backButtonStyle}
          onPress={() => navigation.goBack()}></BackArrow>
      </View>
      <View style={styles.customMargin}>
        <Text style={styles.text}> Sign up</Text>
      </View>
      <BusinessSignupComponent
        navigation={navigation}></BusinessSignupComponent>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: hp('5%'),
    fontWeight: 'bold',
    color: Colors.APP_BLUE,
  },

  customMargin: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: hp('1%'),
  },

  backButtonStyle: {
    paddingLeft: wp('1%'),
    paddingTop: hp('1%'),
    backgroundColor: 'white',
    width: wp('9%'),
  },
  loginGroup: {
    paddingTop: hp('1.3%'),
    flex: 0.97,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  loginLableText: {
    fontSize: hp('2.8%'),
    textDecorationLine: 'underline',
    color: Colors.APP_BLUE,
  },
});
export default BusinessSignupPage;
