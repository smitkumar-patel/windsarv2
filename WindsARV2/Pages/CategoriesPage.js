import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Tree from 'react-native-vector-icons/Entypo';
import Glass from 'react-native-vector-icons/FontAwesome5';
import Park from 'react-native-vector-icons/MaterialIcons';
import Art from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../utils/Colors';
const CategoriesPage = () => {
  return (
    <View style={styles.main}>
      <View style={styles.flexDirectionRow}>
        <View style={styles.circle}>
          <Park name="park" color="white" size={hp('8%')}></Park>
        </View>
        <View style={styles.circle}>
          <Park name="park" color="white" size={hp('8%')}></Park>
        </View>
      </View>
      <View style={styles.flexDirectionRowNoSpace}>
        <Text style={styles.iconText}>Nature</Text>
        <Text style={styles.iconText}>Club</Text>
      </View>

      <View style={styles.flexDirectionRow}>
        <View style={styles.circle}>
          <Park name="park" color="white" size={hp('8%')}></Park>
        </View>
        <View style={styles.circle}>
          <Art name="color-palette-outline" color="white" size={hp('8%')}></Art>
        </View>
      </View>
      <View style={styles.flexDirectionRowNoSpace}>
        <Text style={styles.iconText}>Amusement</Text>
        <Text style={styles.iconText}>Art</Text>
      </View>
      <View style={styles.flexDirectionRow}>
        <View style={styles.circle}>
          <Park name="local-mall" color="white" size={hp('8%')}></Park>
        </View>
        <View style={styles.circle}>
          <Glass name="building" color="white" size={hp('8%')}></Glass>
        </View>
      </View>
      <View style={styles.flexDirectionRowNoSpace}>
        <Text style={styles.iconText}>Shooping</Text>
        <Text style={styles.iconText}>Historical</Text>
      </View>
    </View>
  );
};

export default CategoriesPage;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.APP_BLUE,
  },
  flexDirectionRow: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  flexDirectionRowNoSpace: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconText: {
    color: 'white',
    fontSize: hp('3%'),
    alignContent: 'center',
    alignSelf: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('9%'),
    borderColor: 'gold',
    borderWidth: hp('0.2%'),
    borderStyle: 'solid',
    height: hp('15%'),
    width: wp('30%'),
  },
});
