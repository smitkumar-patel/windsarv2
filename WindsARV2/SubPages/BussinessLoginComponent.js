import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text,
} from 'react-native';
import Colors from '../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {updateBusinessData} from '../redux/user/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
const BussinessLoginComponent = ({navigation}) => {
  const dispatch = useDispatch();
  const {businessData} = useSelector(state => state.business);
  const [username, setUserName] = useState({username: ''});
  const [password, setPassword] = useState({password: ''});
  const [usernameError, setUsernameError] = useState({
    usernameErrorMessage: '',
    isValid: true,
  });
  const [passwordError, setPasswordError] = useState({
    passwordErrorMessage: '',
    isValid: true,
  });
  const [data, setData] = useState(null);
  const [testR, setTestR] = useState(null);
  const validateInput = () => {
    const unamePwdStartRegex = /^[a-zA-Z]/;
    const unameRegex2 = /^[a-zA-Z][a-zA-Z0-9]*[@][a-zA-Z]*[.][a-z]{2,}$/;
    const pwdRegex = /^[a-zA-Z]([a-zA-Z0-9]*[@#$]*)*$/;

    if (username.username.length == 0) {
      setUsernameError({
        usernameErrorMessage: 'Please enter username',
        isValid: false,
      });
    } else {
      if (!unamePwdStartRegex.test(username.username)) {
        setUsernameError({
          usernameErrorMessage: 'Username must start with letter',
          isValid: false,
        });
      } else if (!unameRegex2.test(username.username)) {
        setUsernameError({
          usernameErrorMessage: 'Wrong email address(@ or . missing)',
          isValid: false,
        });
      } else {
        setUsernameError({
          userNameErrorMessage: '',
          isValid: true,
        });
      }
    }
    if (password.password.length == 0) {
      setPasswordError({
        passwordErrorMessage: 'Please enter password',
        isValid: false,
      });
    } else {
      if (password.password.length < 3) {
        setPasswordError({
          passwordErrorMessage: 'Password is more than 6',
          isValid: false,
        });
      } else if (!unamePwdStartRegex.test(password.password)) {
        setPasswordError({
          passwordErrorMessage: 'Password must start with letter',
          isValid: false,
        });
      } else if (!pwdRegex.test(password.password)) {
        setPasswordError({
          passwordErrorMessage:
            'Password contain only number, letter, @, # and $',
          isValid: false,
        });
      } else {
        setPasswordError({
          passwordErrorMessage: '',
          isValid: true,
        });
      }
    }
    if (
      usernameError.isValid &&
      passwordError.isValid &&
      username.username.length != 0 &&
      password.password.length != 0
    ) {
      sendDataAPI();
    }
  };
  const sendDataAPI = async () => {
    var LoginData = {
      email: username.username,
      password: password.password,
    };
    let response = await fetch(
      'http://localhost:3000/registerCustomer/loginBusiness/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: LoginData.email,
          password: LoginData.password,
        }),
      },
    );
    let recieveResponse = await response.json();
    if (recieveResponse.success == 'True') {
      dispatch(
        updateBusinessData({
          name: recieveResponse.BusinessName,
          email: LoginData.email,
        }),
      );
      await AsyncStorage.clear();
      await AsyncStorage.setItem('isLogged', JSON.stringify(true));
      await AsyncStorage.setItem('userType', 'business');
      await AsyncStorage.setItem(
        'business_id',
        JSON.stringify(recieveResponse.user_id),
      );
      await AsyncStorage.setItem('business_email', LoginData.email);
      await AsyncStorage.setItem(
        'business_name',
        recieveResponse.BusinessName,
      ).then(navigation.navigate('Navigator'));
    } else {
      console.log(recieveResponse);
      alert('Wrong user/password. Enter again.');
    }
  };
  const notifyUser = () => {
    alert(testR.success);
  };
  const alertMessage = () => {
    alert('working');
  };
  return (
    <View style={styles.customMargin}>
      <Text style={[styles.text, {marginTop: hp('4%')}]}> Username </Text>
      <TextInput
        style={styles.input}
        onChangeText={data => setUserName({username: data})}
      />

      <Text style={styles.errorText}>{usernameError.usernameErrorMessage}</Text>

      <Text style={styles.text}> Password </Text>
      <TextInput
        secureTextEntry={true}
        label="passWord"
        style={styles.input}
        onChangeText={data => setPassword({password: data})}
      />

      <Text style={styles.errorText}>
        {passwordError.passwordErrorMessage}{' '}
      </Text>

      <TouchableOpacity style={styles.touchButton} onPress={validateInput}>
        <Text style={styles.buttonText}> Log in </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  text: {
    paddingLeft: wp('11%'),
    fontSize: hp('2%'),
    textAlign: 'left',
    color: 'white',
    textAlign: 'left',
  },
  customMargin: {
    flex: 1,
    borderTopLeftRadius: hp('7%'),
    borderTopRightRadius: hp('7%'),
    backgroundColor: Colors.APP_BLUE,
    justifyContent: 'center',
  },
  touchButton: {
    backgroundColor: 'gold',
    height: hp('7%'),
    width: wp('25%'),
    alignSelf: 'center',
    marginTop: hp('2%'),
    borderRadius: hp('4%'),
    marginBottom: hp('2%'),
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: hp('2.6%'),
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'right',
    paddingLeft: wp('15%'),
    paddingRight: wp('10%'),
    fontSize: hp('2%'),
  },
});

export default BussinessLoginComponent;
