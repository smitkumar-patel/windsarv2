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
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from '../Pages/LoadingComponent';
const LoginComponent = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState({
    usernameErrorMessage: '',
    isValid: true,
  });
  const [passwordError, setPasswordError] = useState({
    passwordErrorMessage: '',
    isValid: true,
  });
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const validateInput = () => {
    const unamePwdStartRegex = /^[a-zA-Z]/;
    const unameRegex2 = /^[a-zA-Z][a-zA-Z0-9]*[@][a-zA-Z]*[.][a-z]{2,}$/;
    const pwdRegex = /^[a-zA-Z]([a-zA-Z0-9]*[@#$]*)*$/;

    if (username.length == 0) {
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
          usernameErrorMessage: 'Username contain number and letter only',
          isValid: false,
        });
      } else {
        setUsernameError({
          userNameErrorMessage: '',
          isValid: true,
        });
      }
    }
    if (password.length == 0) {
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
      username.length != 0 &&
      password.length != 0
    ) {
      setIsLoading(true);
      sendDataAPI();
    }
  };
  const sendDataAPI = async () => {
    var LoginData = {
      email: username.username,
      password: password.password,
    };
    let response = await fetch('https://windsarv2.herokuapp.com/loginUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: LoginData.email,
        password: LoginData.password,
      }),
    }).catch(err => console.log(err));
    let recieveResponse = await response.json();
    if (recieveResponse.success == 'True') {
      await AsyncStorage.clear();
      AsyncStorage.setItem('isLogged', JSON.stringify(true));
      AsyncStorage.setItem('user_id', JSON.stringify(recieveResponse.user_id));
      AsyncStorage.setItem('userType', recieveResponse.type).then(
        navigation.navigate('Navigator'),
      );
    } else {
      alert('Wrong user/password. Enter again.');
    }
    setIsLoading(false);
  };
  const alertMessage = () => {
    alert('working');
  };
  return (
    <View style={styles.customMargin}>
      {isLoading && (
        <View>
          <LoadingComponent></LoadingComponent>
        </View>
      )}
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

export default LoginComponent;
