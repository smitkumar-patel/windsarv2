import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../utils/Colors';
const LandingPageComponent = ({navigation}) => {
  return (
    <View style={styles.customMargin}>
      <Text style={styles.text}>Welcome to WindsAR!</Text>
      <Text style={styles.subtext}>
        Your new way to explore the world around you in Augmented Reality and
        win exciting rewards.
      </Text>
      <Text style={styles.subtext2}>Own a business?</Text>
      <Text style={[styles.subtext2, {paddingBottom: '5%'}]}>
        Sign up now to add yourself on the map. Lets jump in!
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.touchButton2}
          onPress={() => navigation.navigate('SignupAs')}>
          <Text style={styles.buttonText}> Sign up </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchButton}
          onPress={() => navigation.navigate('LoginPage')}>
          <Text style={[styles.buttonText]}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: hp('4%'),
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: hp('2%'),
    color: 'white',
    textAlign: 'justify',
    paddingLeft: wp('13%'),
    paddingRight: wp('13%'),
    paddingTop: hp('3%'),
  },
  subtext2: {
    fontSize: hp('2%'),
    color: 'white',
    textAlign: 'justify',
    paddingLeft: wp('13%'),
    paddingRight: wp('13%'),
  },
  customMargin: {
    flex: 1,
    paddingTop: hp('5%'),
    marginTop: hp('53%'),
    borderTopLeftRadius: hp('7%'),
    borderTopRightRadius: hp('7%'),
    backgroundColor: Colors.APP_BLUE,
  },
  touchButton: {
    backgroundColor: 'gold',
    height: hp('7%'),
    width: wp('25%'),
    marginTop: hp('1%'),
    borderRadius: hp('5%'),
    alignContent: 'center',
    justifyContent: 'center',
  },
  touchButton2: {
    backgroundColor: 'white',
    height: hp('7%'),
    width: wp('25%'),
    marginTop: hp('1%'),
    borderRadius: hp('5%'),
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: hp('2.6%'),
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: hp('80%'),
    width: 'auto',
  },
});

export default LandingPageComponent;
