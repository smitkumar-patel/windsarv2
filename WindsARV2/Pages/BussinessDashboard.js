import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BarsButton from 'react-native-vector-icons/FontAwesome';
import BackArrow from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const BussinessDashboard = ({navigation}) => {
  return (
    <>
      <View>
        <View>
          <BackArrow
            name="arrow-back"
            size={wp('8%')}
            style={styles.backButtonStyle}
            onPress={() => navigation.goBack()}></BackArrow>
        </View>
      </View>
      <View style={styles.container}>
        <Text>Coming soon!</Text>
      </View>
    </>
  );
};

export default BussinessDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BarsButtonStyle: {
    color: 'black',
    paddingTop: hp('2%'),
    paddingLeft: hp('2%'),
  },
  backButtonStyle: {
    paddingLeft: wp('1%'),
    paddingTop: hp('1%'),
    width: wp('9%'),
  },
});
