import React, {useEffect} from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LandingPageComponent from '../SubPages/LandingPageComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LandingPage = ({navigation}) => {
  return (
    <>
      <View style={styles.customMargin}>
        <ImageBackground
          source={require('../Images/landingbackground.png')}
          style={{
            height: hp('100%'),
            width: wp('100%'),
          }}>
          <LandingPageComponent navigation={navigation}></LandingPageComponent>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  customMargin: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default LandingPage;
