import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../utils/Colors';
import Resources from '../utils/Resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const UserEditProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.half1}>
        <Text style={styles.editProfileText}>Edit profile</Text>
      </View>
      <View style={styles.half2}>
        <Text style={styles.inputText}>Name : </Text>
        <TextInput style={styles.input} />

        <Text style={styles.inputText}>Email : </Text>
        <TextInput style={styles.input} />

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserEditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  half1: {flex: 0.4, justifyContent: 'center', alignItems: 'center'},
  editProfileText: {
    fontSize: hp('5%'),
    color: Colors.APP_BLUE,
    fontWeight: 'bold',
  },
  half2: {
    paddingTop: hp('5%'),
    flex: 0.6,
    backgroundColor: Colors.APP_BLUE,
    borderTopLeftRadius: hp('8%'),
    borderTopRightRadius: hp('8%'),
  },
  input: {
    margin: hp('1.5%'),
    height: hp('6.2%'),
    width: wp('80%'),
    paddingLeft: wp('6%'),
    backgroundColor: 'white',
    color: 'black',
    alignSelf: 'center',
    borderRadius: hp('4%'),
  },
  inputText: {
    paddingLeft: wp('12%'),
    fontSize: hp('2.5%'),
    color: 'white',
  },
  saveButton: {
    marginTop: hp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('5%'),
    backgroundColor: 'gold',
    height: hp('7%'),
    width: wp('25%'),
    alignSelf: 'flex-end',
    marginRight: wp('10%'),
  },
  saveButtonText: {
    fontSize: hp('3%'),
    color: Colors.APP_BLUE,
  },
});
