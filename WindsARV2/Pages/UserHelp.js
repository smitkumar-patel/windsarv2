import React, {useState} from 'react';
import DeleteIcon from 'react-native-vector-icons/AntDesign';
import edit from 'react-native-vector-icons/FontAwesome';
import deleteCircle from 'react-native-vector-icons/MaterialCommunityIcons';
import BackArrow from 'react-native-vector-icons/MaterialIcons';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  Button,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Linking,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {color} from 'react-native-reanimated';
import Colors from '../utils/Colors';
export default class UserHelp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteChoice: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButtonStyle}>
          <BackArrow
            name="arrow-back"
            Icon
            style={{color: '#FFF'}}
            size={wp('6%')}
            onPress={() => this.props.navigation.goBack()}></BackArrow>
        </TouchableOpacity>

        <View style={styles.bottom}>
          <Text style={styles.text1}>Get Help</Text>

          <View style={styles.section}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://shop.panasonic.com/on/demandware.static/-/Sites-PanasonicB2C-Library/default/dw2d04d2f4/images/contactus/EmailIcon.png',
              }}
            />
            <Text style={styles.stext}>Contact Us</Text>
            <Text style={styles.stext1}>
              If you have encountered any issue with this application, you can
              have it resolve it quickly. Our diverse team provides the
              following ways for you to acquire the requiredassistance. Email
              your issue, along with its entire details atsoni82@uwindsor.ca
              Once we receive your email, our team will try to fix the issue as
              soon as possible, so that you always have a 24/7 great
              experiencewhile surfing our WindsAR application.
            </Text>

            <ScrollView>
              <SafeAreaView>
                <View style={styles.lowerSection}>
                  <Text style={styles.stext}>FAQ</Text>

                  <Text style={styles.stext2}>How to reset Password?</Text>

                  <Text style={styles.stext2}>How to redeem voucher?</Text>

                  <Text style={styles.stext2}>
                    How to use this application?
                  </Text>
                </View>
              </SafeAreaView>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

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
    height: 100,
    alignItems: 'center',
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
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#fff',
    borderRadius: 40,
    alignItems: 'center',
  },

  lowerSection: {
    width: wp('100%'),
    height: hp('67%'),
    backgroundColor: '#fff',
    alignItems: 'center',
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
    marginTop: hp('2%'),
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
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#002456',
    marginTop: hp('2%'),
    textDecorationLine: 'underline',
  },

  stext1: {
    fontSize: hp('2.1%'),
    fontWeight: 'normal',
    color: '#696969',
    marginTop: hp('2%'),
    width: wp('80%'),
    textAlign: 'justify',
    alignSelf: 'center',
  },

  stext2: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    color: '#696969',
    marginTop: hp('2.5%'),
    alignSelf: 'flex-start',
    marginLeft: wp('9.9%'),
    textDecorationLine: 'underline',
    textAlign: 'center',
  },

  stext3: {
    fontSize: hp('2%'),
    fontWeight: 'normal',
    color: '#696969',
    marginTop: hp('0.6%'),
    width: wp('80%'),
    textAlign: 'justify',
  },

  subSection: {
    width: wp('40%'),
    height: hp('6%'),
    backgroundColor: '#FECE05',
    borderRadius: 30,
    alignContent: 'center',
    marginTop: hp('3%'),
  },

  innertext: {
    fontStyle: 'normal',
    fontSize: hp('2.1%'),
    fontWeight: 'bold',
    color: '#B42D20',
    textAlign: 'center',
    marginTop: hp('1.2%'),
  },

  tinyLogo: {
    width: wp('30%'),
    height: hp('15%'),
    marginTop: hp('2%'),
  },
});
