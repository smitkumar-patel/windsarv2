import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ArrowRight from 'react-native-vector-icons/AntDesign';
import BackArrow from 'react-native-vector-icons/MaterialIcons';
import Colors from '../utils/Colors';
const SignupAs = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{backgroundColor: 'white'}}>
        <BackArrow
          name="arrow-back"
          size={wp('8%')}
          style={styles.backButtonStyle}
          onPress={() => navigation.goBack()}></BackArrow>
      </View>
      <View style={styles.half1}>
        <Text style={styles.heading}>Sign up</Text>
      </View>
      <View style={styles.half2}>
        <Text style={styles.text}>I AM A</Text>
        <TouchableOpacity
          style={styles.buttonCus}
          onPress={() => navigation.navigate('SignupPage')}>
          <Text style={styles.textCus}> Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOwn}
          onPress={() => navigation.navigate('BussinessSignupPage')}>
          <Text style={styles.textOwn}> Bussiness Owner</Text>
        </TouchableOpacity>
        <View style={styles.devArrow}>
          <TouchableOpacity>
            <Text style={styles.textDev}> Developer</Text>
          </TouchableOpacity>
          <ArrowRight
            size={hp('2.5%')}
            name="arrowright"
            style={styles.arrowRight}></ArrowRight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonStyle: {
    paddingLeft: wp('1%'),
    paddingTop: hp('1%'),
    backgroundColor: 'white',
    width: wp('9%'),
  },
  half1: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  half2: {
    borderTopLeftRadius: hp('7%'),
    borderTopRightRadius: hp('7%'),
    flex: 0.6,
    backgroundColor: Colors.APP_BLUE,
    alignItems: 'center',
  },
  heading: {
    fontSize: hp('5%'),
    fontWeight: 'bold',
    color: Colors.APP_BLUE,
  },
  text: {
    paddingTop: hp('3%'),
    fontSize: hp('2.5%'),
    color: 'rgba(255, 255, 255, 1)',
  },
  buttonCus: {
    marginTop: hp('5%'),
    height: hp('7%'),
    width: wp('70%'),
    backgroundColor: 'rgba(237, 207, 46, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('30%'),
  },
  textCus: {
    color: 'black',
    fontSize: hp('2.5%'),
  },
  buttonOwn: {
    marginTop: hp('5%'),
    height: hp('7%'),
    width: wp('70%'),
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('30%'),
  },
  textOwn: {
    color: 'black',
    fontSize: hp('2.5%'),
  },
  textDev: {
    color: 'white',
    fontSize: hp('2.5%'),
  },
  arrowRight: {
    color: 'white',
  },
  devArrow: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingTop: hp('15%'),
    paddingRight: wp('5%'),
  },
});

export default SignupAs;
