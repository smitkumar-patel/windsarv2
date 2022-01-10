import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text,
} from 'react-native';
import Colors from '../utils/Colors';
import CheckBox from '@react-native-community/checkbox';
import Geolocation from 'react-native-geolocation-service';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const BusinessSignupComponent = ({navigation}) => {
  const [deviceLatLong, setDeviceLatLong] = useState({
    deviceLat: '',
    deviceLong: '',
  });
  const [permissionMessage, setPermissionMessage] = useState('');
  function findCoordinates() {
    Geolocation.getCurrentPosition(
      position => {
        setDeviceLatLong({
          deviceLat: position.coords.latitude,
          deviceLong: position.coords.longitude,
        });
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 100000, maximumAge: 100000},
    );
  }
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        findCoordinates();
        setPermissionMessage('');
      } else if (granted == PermissionsAndroid.RESULTS.DENIED) {
        setPermissionMessage('Location permission denied');
      } else if (granted == PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        setPermissionMessage('Location permission set to never ask again');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const [locationError, setLocationError] = useState({
    locationErrorMesssage: '',
    isValid: 'true',
  });
  const [showTermsbox, setShowTermsbox] = useState(false);
  const [termsCheckbox, setTermsCheckbox] = useState(false);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState({
    nameErrorMessage: '',
    isValid: true,
  });
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState({
    emailErrorMessage: '',
    isValid: true,
  });

  const [category, setCat] = useState('');
  const [catError, setCatError] = useState({
    catErrorMessage: '',
    isValid: true,
  });

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState({
    passwordErrorMessage: '',
    isValid: true,
  });
  const [repassword, setRepassword] = useState('');
  const [repasswordError, setRepasswordError] = useState({
    repasswordErrorMessage: '',
    isValid: true,
  });

  const validateInput = () => {
    const startRegex = /^[a-zA-Z]/;
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*[@][a-zA-Z]+[.][a-z]{2,}$/;
    const pwdRegex = /^[a-zA-Z]([a-zA-Z0-9]*[@#$]*)*$/;

    if (name.length == 0) {
      setNameError({
        nameErrorMessage: 'Please enter name',
        isValid: false,
      });
    } else {
      if (name.name.length < 3) {
        setNameError({
          nameErrorMessage: 'Name is more than 3',
          isValid: false,
        });
      } else if (!startRegex.test(name.name)) {
        setNameError({
          nameErrorMessage: 'Name must start with letter',
          isValid: false,
        });
      } else {
        setNameError({
          nameErrorMessage: '',
          isValid: true,
        });
      }
    }

    if (category.length == 0) {
      setCatError({
        catErrorMessage: 'Please select category',
        isValid: false,
      });
    } else {
      setCatError({catErrorMessage: '', isValid: true});
    }

    if (email.length == 0) {
      setEmailError({
        emailErrorMessage: 'Please enter email id',
        isValid: false,
      });
    } else {
      if (!startRegex.test(email.email)) {
        setEmailError({
          emailErrorMessage: 'Email address must start with letter',
          isValid: false,
        });
      } else if (!emailRegex.test(email.email)) {
        setEmailError({
          emailErrorMessage: 'Email address is invalid',
          isValid: false,
        });
      } else {
        setEmailError({
          emailErrorMessage: '',
          isValid: true,
        });
      }
    }
    //Password validation
    if (password.length == 0) {
      setPasswordError({
        passwordErrorMessage: 'Please enter password',
        isValid: false,
      });
    } else {
      if (password.password.length < 7) {
        setPasswordError({
          passwordErrorMessage: 'Password is more than 6',
          isValid: false,
        });
      } else if (!startRegex.test(password.password)) {
        setPasswordError({
          passwordErrorMessage: 'Password msut start with letter',
          isValid: false,
        });
      } else if (!pwdRegex.test(password.password)) {
        setPasswordError({
          passwordErrorMessage: 'Password have letter,number,@,# and $',
        });
      } else {
        setPasswordError({
          passwordErrorMessage: '',
          isValid: true,
        });
      }
    }
    if (repassword.length == 0) {
      setRepasswordError({
        repasswordErrorMessage: 'Please enter password',
        isValid: false,
      });
    } else {
      if (repassword.repassword.length < 7) {
        setRepasswordError({
          repasswordErrorMessage: 'Retype password is more than 6',
          isValid: false,
        });
      } else if (!startRegex.test(password.password)) {
        setRepasswordError({
          repasswordErrorMessage: 'Retype password must start with letter',
          isValid: false,
        });
      } else if (!pwdRegex.test(password.password)) {
        setRepasswordError({
          repasswordErrorMessage:
            'Retype password have letter,number,@,# and $',
          isValid: false,
        });
      } else if (password.password != repassword.repassword) {
        setRepasswordError({
          repasswordErrorMessage: 'Passwords does not match',
          isValid: false,
        });
      } else {
        setRepasswordError({
          repasswordErrorMessage: '',
          isValid: true,
        });
      }
    }
    if (termsCheckbox == false) {
      alert('Please agree to terms to conditions');
    } else {
      if (
        nameError.isValid &&
        emailError.isValid &&
        passwordError.isValid &&
        repasswordError.isValid &&
        name.length != 0 &&
        email.length != 0 &&
        password.length != 0 &&
        repassword.length != 0
      ) {
        sendDataAPI();
      }
    }
  };
  const sendDataAPI = async () => {
    var RegisterData = {
      name: name.name,
      address: address.address,
      category: category.category,
      latitude: deviceLatLong.deviceLat,
      longitude: deviceLatLong.deviceLong,
      email: email.email,
      password: password.password,
    };
    try {
      let response = await fetch(
        'https://windsarv2.herokuapp.com/registerBusiness',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: RegisterData.name,
            address: RegisterData.address,
            category: RegisterData.category,
            latitude: RegisterData.latitude,
            longitude: RegisterData.longitude,
            email: RegisterData.email,
            password: RegisterData.password,
            type: 'bussiness',
          }),
        },
      );
      let recieveResponse = await response.json();
      if (recieveResponse.success == 'True') {
        alert('User is registered');
        navigation.navigate('LoginPage');
      } else {
        console.log(recieveResponse);
        alert('User is not registered');
      }
    } catch (error) {}
  };
  return (
    <View style={styles.customMargin}>
      {showTermsbox && (
        <View style={styles.termsConditionBox}>
          <View style={{padding: hp('3%')}}>
            <Text style={styles.termsConditionText}>
              Etiam pulvinar mi enim, vel laore leo efficitur non.
            </Text>
            <Text style={styles.termsConditionText}>
              Etiam pulvinar mi enim, vel laore leo efficitur non.
            </Text>
            <Text style={styles.termsConditionText}>
              Etiam pulvinar mi enim, vel laore leo efficitur non.
            </Text>
            <Text style={styles.termsConditionText}>
              Etiam pulvinar mi enim, vel laore leo efficitur non.
            </Text>
            <Text style={styles.termsConditionText}>
              Etiam pulvinar mi enim, vel laore leo efficitur non.
            </Text>
            <Text style={styles.termsConditionText}>
              Etiam pulvinar mi enim, vel laore leo efficitur non.
            </Text>
            <Text style={styles.termsConditionText}>
              Etiam pulvinar mi enim, vel laore leo efficitur non.
            </Text>
            <Text style={styles.termsConditionText}>
              Etiam pulvinar mi enim, vel laore leo efficitur non.
            </Text>
            <Text style={styles.termsConditionText}>
              Etiam pulvinar mi enim, vel laore leo efficitur non.
            </Text>
            <Text style={styles.termsConditionText}>
              Etiam pulvinar mi enim, vel laore leo efficitur non.
            </Text>
            <Text style={styles.termsConditionText}>
              Etiam pulvinar mi enim, vel laore leo efficitur non.
            </Text>
          </View>
          <View style={{marginBottom: 'auto'}}></View>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', padding: hp('3.0%')}}>
            <Text
              style={{
                fontSize: hp('2.5%'),
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView>
        <Text style={[styles.text, {paddingTop: hp('3%')}]}>
          Business Name:
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={data => setName({name: data})}
        />

        <Text style={styles.errorText}>{nameError.nameErrorMessage}</Text>

        <Text style={styles.text}>Business Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={data => setEmail({email: data})}
        />

        <Text style={styles.errorText}>{emailError.emailErrorMessage}</Text>

        <Text style={styles.text}>Category:</Text>
        <TextInput
          style={styles.input}
          onChangeText={data => setCat({category: data})}
        />
        <Text style={styles.errorText}>{catError.catErrorMessage}</Text>

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>Latitude:</Text>
          <Text style={[styles.text, {marginLeft: wp('10%')}]}>Longitude:</Text>
        </View>

        <View style={styles.latLongView}>
          <TextInput
            style={styles.inputHalf}
            value={deviceLatLong.deviceLat.toString()}
            keyboardType="numeric"
            onChangeText={data =>
              setDeviceLatLong({...deviceLatLong, deviceLat: data})
            }
          />
          <TextInput
            style={styles.inputHalf}
            value={deviceLatLong.deviceLong.toString()}
            keyboardType="numeric"
            onChangeText={data =>
              setDeviceLatLong({...deviceLatLong, deviceLong: data})
            }
          />
        </View>
        <TouchableOpacity onPress={() => requestCameraPermission()}>
          <Text style={styles.getLocationText}>Get current location</Text>
        </TouchableOpacity>
        <Text style={[styles.errorText, {paddingTop: hp('0.3%')}]}>
          {permissionMessage}
        </Text>
        <Text style={styles.text}>Address:</Text>
        <TextInput
          style={styles.input}
          onChangeText={data => setAddress({address: data})}
        />

        <Text style={styles.text}>Password:</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={data => setPassword({password: data})}
        />

        <Text style={styles.errorText}>
          {passwordError.passwordErrorMessage}
        </Text>

        <Text style={styles.text}>Retype Password:</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={data => setRepassword({repassword: data})}
        />

        <Text style={styles.errorText}>
          {repasswordError.repasswordErrorMessage}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'yellow',
              marginLeft: wp('12%'),
              marginTop: hp('0.8%'),
            }}
            onPress={() => setShowTermsbox(true)}>
            I agree to terms and condition by signing up
          </Text>
          <CheckBox
            value={termsCheckbox}
            onValueChange={setTermsCheckbox}
            tintColors={{true: 'white', false: 'white'}}
            style={{alignSelf: 'center', marginBottom: -3}}
          />
        </View>
        <TouchableOpacity style={styles.touchButton} onPress={validateInput}>
          <Text style={styles.buttonText}> Sign up </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  termsConditionText: {
    fontSize: hp('2.5%'),
  },
  termsConditionBox: {
    zIndex: 1,
    borderRadius: hp('6%'),
    marginTop: hp('3%'),
    alignSelf: 'center',
    position: 'absolute',
    height: hp('78%'),
    width: wp('85%'),
    backgroundColor: 'white',
  },
  dob: {flexDirection: 'row'},
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

  input2: {
    margin: hp('1.5%'),
    height: hp('6.2%'),
    width: wp('68%'),
    marginLeft: wp('10%'),
    paddingLeft: wp('6%'),
    backgroundColor: 'white',
    color: 'black',
    alignSelf: 'center',
    borderRadius: hp('4%'),
  },
  latLongView: {marginLeft: wp('8%'), flexDirection: 'row'},
  inputHalf: {
    margin: hp('1.5%'),
    height: hp('6.2%'),
    width: wp('36%'),
    backgroundColor: 'white',
    color: 'black',
    paddingLeft: wp('6%'),
    alignSelf: 'center',
    borderRadius: hp('4%'),
  },
  text: {
    paddingLeft: wp('15%'),
    fontSize: hp('2%'),
    textAlign: 'left',
    color: 'white',
    textAlign: 'left',
  },
  getLocationText: {
    fontSize: hp('2.2%'),
    color: 'yellow',
    textAlign: 'right',
    paddingRight: wp('8%'),
  },
  customMargin: {
    flex: 0.98,
    borderTopLeftRadius: hp('7%'),
    borderTopRightRadius: hp('7%'),
    backgroundColor: Colors.APP_BLUE,
  },

  touchButton: {
    backgroundColor: 'gold',
    height: hp('7%'),
    width: wp('35%'),
    alignSelf: 'flex-end',
    marginTop: hp('3%'),
    marginRight: wp('9%'),
    borderRadius: hp('4%'),
    marginBottom: hp('5%'),
    alignContent: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: hp('2.6%'),
    textAlign: 'center',
  },

  errorText: {
    marginTop: hp('-1%'),
    textAlign: 'right',
    color: 'red',
    paddingLeft: wp('15%'),
    paddingRight: wp('10%'),
    fontSize: hp('1.8%'),
  },
});

export default BusinessSignupComponent;
