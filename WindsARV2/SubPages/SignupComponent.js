import React, {useState} from 'react';
import {
  ScrollView,
  Platform,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text,
} from 'react-native';
import Colors from '../utils/Colors';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const SignupComponent = ({navigation}) => {
  const [showTermsbox, setShowTermsbox] = useState(false);
  const [termsCheckbox, setTermsCheckbox] = useState(false);
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [DOB, setDOB] = useState('');
  const [DOBError, setDOBError] = useState({
    DOBErrorMessage: '',
    isValid: true,
  });
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState({
    nameErrorMessage: '',
    isValid: true,
  });
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState({
    emailErrorMessage: '',
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
    if (DOB == '') {
      setDOBError({
        DOBErrorMessage: 'Please enter Date of birth',
        isValid: false,
      });
    } else {
      setDOBError({
        DOBErrorMessage: '',
        isValid: true,
      });
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
          passwordErrorMessage: 'Password must start with letter',
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
        DOBError.isValid &&
        emailError.isValid &&
        passwordError.isValid &&
        repasswordError.isValid &&
        name.length != 0 &&
        DOB.length != 0 &&
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
      emailid: email.email,
      password: password.password,
      dob: DOB,
    };

    let response = await fetch('http://localhost:3000/registerUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: RegisterData.name,
        email: RegisterData.emailid,
        password: RegisterData.password,
        dob: RegisterData.dob,
        type: 'customer',
      }),
    });
    let recieveResponse = await response.json();
    if (recieveResponse.success == 'True') {
      alert('User is registered');
      navigation.navigate('LoginPage');
    } else {
      alert('User is not registered');
    }
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    var DateObj = new Date(currentDate);

    let month = DateObj.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day = DateObj.getDate();
    if (day < 10) {
      day = '0' + day;
    }

    var formattedDate = DateObj.getFullYear() + '-' + month + '-' + day;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setDOB(formattedDate);
  };
  const alertMessage = () => {
    alert('working');
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  return (
    <View style={styles.customMargin}>
      <ScrollView>
        <Text style={[styles.text, {paddingTop: hp('3%')}]}> Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={data => setName({name: data})}
        />

        <Text style={styles.errorText}>{nameError.nameErrorMessage}</Text>

        <Text style={styles.text}> Date Of Birth</Text>
        <View style={styles.dob}>
          <TextInput placeholder={DOB} editable={false} style={styles.input2} />
          <TouchableOpacity onPress={showDatepicker}>
            <Icon
              name="calendar"
              size={hp('5%')}
              color="white"
              style={{paddingTop: hp('2.2%')}}
            />
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="spinner"
              onChange={onChange}
            />
          )}
        </View>

        <Text style={styles.errorText}>{DOBError.DOBErrorMessage}</Text>

        <Text style={styles.text}> Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={data => setEmail({email: data})}
        />

        <Text style={styles.errorText}>{emailError.emailErrorMessage}</Text>

        <Text style={styles.text}> Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={data => setPassword({password: data})}
        />

        <Text style={styles.errorText}>
          {passwordError.passwordErrorMessage}
        </Text>

        <Text style={styles.text}> Retype Password</Text>
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
            }}>
            I agree to terms and condition by signing up
          </Text>
          <CheckBox
            value={termsCheckbox}
            onValueChange={setTermsCheckbox}
            tintColors={{true: 'white', false: 'white'}}
            style={{alignSelf: 'center', marginBottom: -3}}
          />
        </View>
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
              style={{alignSelf: 'flex-end', padding: hp('3.0%')}}
              onPress={() => setShowTermsbox(false)}>
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
    margin: hp('1.4%'),
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
  text: {
    paddingLeft: wp('15%'),
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
  },
  touchButton: {
    backgroundColor: 'gold',
    height: hp('7%'),
    width: wp('25%'),
    alignSelf: 'flex-end',
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

export default SignupComponent;
