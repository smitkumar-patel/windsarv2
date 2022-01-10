import * as React from 'react';
import {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DocumentPicker from 'react-native-document-picker';
import BackArrow from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserImageData, updateUserData} from '../redux/user/action';
import {useEffect} from 'react';
const ProfilePage = ({navigation}) => {
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);
  const _keyboardDidShow = () => {
    setMarginKeyBoard(hp('10%'));
  };
  const _keyboardDidHide = () => {
    setMarginKeyBoard(hp('25%'));
  };
  const dispatch = useDispatch();
  const [marginKeyboard, setMarginKeyBoard] = useState(hp('25%'));
  const {userData} = useSelector(state => state.user);
  const {imageData} = useSelector(state => state.user);
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [errorMessage, setErrorMessage] = useState({
    nameError: '',
    emailError: '',
    isName: false,
    isEmail: false,
  });
  async function getImage() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      dispatch(setUserImageData(res.uri));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }
  const validateInput = async () => {
    const startRegex = /^[a-zA-Z]/;
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*[@][a-zA-Z]+[.][a-z]{2,}$/;
    let temp = errorMessage;
    if (name.length == 0) {
      temp = {
        ...temp,
        nameError: 'please enter name',
        isName: false,
      };
    } else if (!startRegex.test(name)) {
      temp = {
        ...temp,
        nameError: 'name starts with letter',
        isName: false,
      };
    } else {
      temp = {
        ...temp,
        nameError: '',
        isName: true,
      };
    }
    if (email.length == 0) {
      temp = {
        ...temp,
        emailError: 'please enter email',
        isEmail: false,
      };
    } else if (!startRegex.test(email)) {
      temp = {
        ...temp,
        emailError: 'please enter email',
        isEmail: false,
      };
    } else if (!emailRegex.test(email)) {
      temp = {
        ...temp,
        emailError: 'please enter email valid email',
        isEmail: false,
      };
    } else {
      temp = {
        ...temp,
        emailError: '',
        isEmail: true,
      };
    }

    setErrorMessage(temp);
    if (temp.isName && temp.isEmail) {
      const user_id = await AsyncStorage.getItem('user_id');
      let response = await fetch('http://localhost:3000/updateProfile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          name: name,
          email: email,
        }),
      });
      let recievedReponse = await response.json();
      if (recievedReponse.success == 'True') {
        dispatch(
          updateUserData({
            name: name,
            email: email,
          }),
        );
        alert('Profile updated');
      } else {
        alert(recievedReponse.message);
        console.log(recievedReponse);
      }
    }
    setShowEdit(false);
  };
  return (
    <>
      <View style={styles.main}>
        {showEdit && (
          <View style={[styles.editProfile, {top: marginKeyboard}]}>
            <View style={styles.closeIcon}>
              <TouchableOpacity onPress={() => setShowEdit(false)}>
                <CloseIcon name="close" color="white" size={30}></CloseIcon>
              </TouchableOpacity>
            </View>
            <Text style={styles.editProfileEditText}>Edit</Text>
            <Text style={styles.editProfileInputText}>Name</Text>
            <TextInput
              value={name}
              style={styles.input}
              onChangeText={data => setName(data)}
            />
            <Text style={styles.errorText}>{errorMessage.nameError}</Text>
            <Text style={styles.editProfileInputText}>Email</Text>
            <TextInput
              value={email}
              style={styles.input}
              onChangeText={data => setEmail(data)}
            />
            <Text style={styles.errorText}>{errorMessage.emailError}</Text>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => validateInput()}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{backgroundColor: 'white'}}>
          <BackArrow
            name="arrow-back"
            size={wp('8%')}
            style={styles.backButtonStyle}
            onPress={() => navigation.goBack()}></BackArrow>
        </View>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
          }}>
          <View style={styles.half1}>
            <Text style={styles.text}>Profile</Text>

            <View style={styles.dashedCircle}>
              <TouchableOpacity onPress={() => getImage()}>
                {imageData == null ? (
                  <Image
                    style={styles.imageStyle}
                    source={require('../Images/black.jpg')}></Image>
                ) : (
                  <Image
                    style={styles.imageStyle}
                    source={{uri: imageData}}></Image>
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.text2}>Hello, {userData.name}</Text>
            <Text style={styles.text3}>
              {userData.age} | {userData.email}
            </Text>
            <View style={styles.uwinCoins}>
              <Text style={styles.uwinCoinsText1}>{userData.winCoins}</Text>
              <Text style={styles.uwinCoinsText2}>WinCoins</Text>
            </View>
          </View>

          <View style={styles.half2}>
            <Text style={styles.historyText}> History </Text>
            <View style={styles.flexRow}>
              <View style={styles.detailsBox}>
                <Text style={styles.placeText}>Places</Text>
                <Text style={styles.placeValue}>{userData.placeVisited}</Text>
              </View>
              <View style={styles.detailsBox}>
                <Text style={styles.placeText}>Vouchers</Text>
                <Text style={styles.placeValue}>{userData.vouchers}</Text>
              </View>
            </View>
            <View style={styles.flexRow}>
              <TouchableOpacity style={styles.editButton}>
                <Text
                  style={styles.editText}
                  onPress={() => {
                    setShowEdit(true);
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    marginRight: wp('5%'),
    alignSelf: 'flex-end',
  },
  errorText: {
    marginTop: hp('1%'),
    textAlign: 'right',
    color: 'red',
    paddingLeft: wp('15%'),
    paddingRight: wp('10%'),
    fontSize: hp('2%'),
  },
  confirmButton: {
    marginTop: hp('3'),
    height: hp('6.5%'),
    width: wp('30%'),
    backgroundColor: 'gold',
    borderRadius: hp('5%'),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  confirmText: {
    fontSize: hp('2.5%'),
    textAlign: 'center',
    color: Colors.APP_BLUE,
  },
  input: {
    paddingLeft: hp('2%'),
    marginTop: hp('1%'),
    alignSelf: 'center',
    height: hp('7%'),
    width: wp('65%'),
    backgroundColor: 'white',
    color: 'black',
    borderRadius: hp('4%'),
  },
  editProfileEditText: {
    fontSize: hp('3.5%'),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editProfileInputText: {
    paddingLeft: wp('10%'),
    paddingTop: hp('1%'),
    fontSize: hp('2.5%'),
    textAlign: 'left',
    color: 'white',
  },
  editProfile: {
    paddingTop: hp('3%'),
    zIndex: 1,
    position: 'absolute',
    left: wp('10%'),
    right: 0,
    bottom: 0,
    borderRadius: hp('8%'),
    height: hp('53%'),
    width: wp('80%'),
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  backButtonStyle: {
    paddingLeft: wp('1%'),
    paddingTop: hp('1%'),
    backgroundColor: 'white',
    width: wp('9%'),
  },
  text: {
    marginTop: hp('3%'),
    fontWeight: 'bold',
    fontSize: hp('2.3%'),
    color: Colors.APP_BLUE,
  },
  text2: {
    marginTop: hp('2.5%'),
    fontSize: hp('2.2%'),
    color: Colors.APP_BLUE,
  },
  text3: {
    fontSize: hp('1.8%'),
    color: Colors.APP_BLUE,
  },
  uwinCoins: {
    marginTop: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('8%'),
    width: wp('40%'),
    backgroundColor: Colors.APP_BLUE,
    borderRadius: hp('5%'),
  },
  historyText: {
    marginTop: hp('7%'),
    textAlign: 'center',
    fontSize: hp('2.3%'),
    color: 'gold',
  },
  uwinCoinsText1: {
    fontSize: hp('2.7%'),
    color: 'gold',
    fontWeight: 'bold',
  },
  uwinCoinsText2: {
    fontSize: hp('2%'),
    color: 'white',
  },
  main: {
    backgroundColor: Colors.APP_BLUE,
    flex: 1,
  },
  half1: {
    display: 'flex',
    alignItems: 'center',
    flex: 0.45,
    backgroundColor: 'white',
    borderBottomRightRadius: hp('5%'),
    borderBottomLeftRadius: hp('5%'),
  },
  half2: {
    flex: 0.55,
  },
  imageStyle: {
    height: hp('10%'),
    width: wp('20%'),
    borderRadius: hp('10%'),
  },
  dashedCircle: {
    marginTop: hp('2.3%'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('12%'),
    width: wp('24%'),
    borderWidth: hp('0.55%'),
    borderStyle: 'dashed',
    borderColor: Colors.APP_BLUE,
    borderRadius: hp('10%'),
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  detailsBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3.5%'),
    height: hp('15%'),
    width: wp('30%'),
    borderRadius: hp('2%'),
    backgroundColor: 'white',
  },
  editButton: {
    marginTop: hp('10%'),
    backgroundColor: 'white',
    height: hp('7%'),
    width: wp('30%'),
    borderRadius: hp('4%'),
    justifyContent: 'center',
  },
  editText: {
    fontSize: hp('2.1%'),
    textAlign: 'center',
    color: Colors.APP_BLUE,
  },
  deleteButton: {
    marginTop: hp('10%'),
    backgroundColor: 'red',
    height: hp('7%'),
    width: wp('30%'),
    borderRadius: hp('4%'),
    justifyContent: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: hp('2.1%'),
    textAlign: 'center',
  },
  placeText: {
    fontSize: hp('2.1%'),
    textAlign: 'center',
    color: Colors.APP_BLUE,
  },
  placeValue: {
    fontSize: hp('3%'),
    textAlign: 'center',
    color: Colors.APP_BLUE,
    fontWeight: 'bold',
  },
});
export default ProfilePage;
