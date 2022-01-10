import React, {useEffect, useState} from 'react';
import BarsButton from 'react-native-vector-icons/FontAwesome';
import Edit from 'react-native-vector-icons/FontAwesome';
import DeleteCircle from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BackHandler,
  ToastAndroid,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Keyboard,
} from 'react-native';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';
import Colors from '../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  setBusinessVoucherData,
  setBusinessImageData,
  updateBusinessData,
} from '../redux/user/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

const BussinessVouchers = ({navigation}) => {
  let {businessVoucherData} = useSelector(state => state.business);
  const [marginKeyboard, setMarginKeyBoard] = useState(hp('25%'));
  const {businessData} = useSelector(state => state.business);
  const {imageData} = useSelector(state => state.business);
  const [deleteChoice, setDeleteChoice] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState(businessData.name);
  const [email, setEmail] = useState(businessData.email);
  const [errorMessage, setErrorMessage] = useState({
    nameError: '',
    emailError: '',
    isName: false,
    isEmail: false,
  });
  const dispatch = useDispatch();
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
  useEffect(() => {
    let counter = 0;
    const onBackPress = () => {
      if (counter == 0) {
        counter++;
        ToastAndroid.show('Press again to exit!', ToastAndroid.SHORT);
      } else {
        BackHandler.exitApp();
      }
      setTimeout(() => {
        counter = 0;
      }, 2000);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  async function deleteImage(val) {
    const user_id = await AsyncStorage.getItem('user_id');
    let response = await fetch('http://localhost:3000/deleteBussinessVoucher', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        id: val,
      }),
    });
    let recievedReponse = await response.json();
    if ((recievedReponse.success = 'true')) {
      alert('Voucher deleted');
      businessVoucherData = businessVoucherData.filter(data => data.id !== val);
      dispatch(setBusinessVoucherData([...businessVoucherData]));
    } else {
      alert('Voucher could not be deleted');
    }
  }
  async function getImage() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      dispatch(setBusinessImageData(res.uri));
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
          updateBusinessData({
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
      <View style={{backgroundColor: 'white'}}>
        <BarsButton
          name="bars"
          size={wp('7%')}
          style={styles.BarsButtonStyle}
          onPress={() => navigation.openDrawer()}
        />
      </View>
      <View style={styles.container}>
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
        <View style={styles.top}>
          <Text style={styles.heading1}>Business Profile</Text>
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
          <Text style={styles.heading2}>{businessData.name}</Text>
          <Text style={styles.heading3}>{businessData.email}</Text>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.text1}> Current Vouchers</Text>

          <ScrollView>
            <SafeAreaView>
              {businessVoucherData && businessVoucherData.length
                ? businessVoucherData.map(BVData => (
                    <View key={BVData.id}>
                      <View style={styles.section}>
                        <ImageBackground
                          source={{uri: BVData.image}}
                          style={styles.image}>
                          <Text style={styles.stext}>{BVData.discount}</Text>
                          <View style={styles.subSection}>
                            <Text style={styles.innertext}>
                              {BVData.subText}
                            </Text>
                          </View>
                          <Text style={styles.stext}>
                            Wincoins : {BVData.winCoins}
                          </Text>
                        </ImageBackground>

                        <View style={styles.iconContainer}>
                          <View style={styles.iconStyle}>
                            <TouchableOpacity
                              onPress={() =>
                                Alert.alert(
                                  'Delete Voucher',
                                  'Are you sure you want to delete?',
                                  [
                                    {
                                      text: 'Yes',
                                      onPress: () => {
                                        deleteImage(BVData.id);
                                      },
                                    },

                                    {
                                      text: 'No',
                                      onPress: () => {},
                                    },
                                  ],
                                )
                              }>
                              <DeleteCircle
                                name="delete"
                                size={25}
                                color="white"></DeleteCircle>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))
                : null}
            </SafeAreaView>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonStyling}
              onPress={() => setShowEdit(true)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyling1}
              onPress={() => navigation.navigate('AddVoucher')}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default BussinessVouchers;

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    alignItems: 'center',
  },

  top: {
    flex: 0.3,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  centerImage: {
    height: hp('16%'),
    width: wp('32%'),
  },

  bottom: {
    flex: 0.7,
    backgroundColor: Colors.APP_BLUE,
    width: wp('100%'),
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  text1: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#FECE05',
    marginTop: wp('08%'),
    marginBottom: wp('05%'),
  },

  section: {
    height: hp('19%'),
    width: wp('85%'),
    marginBottom: hp('4%'),
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: 130,
    width: wp('26%'),
    height: hp('4%'),
    borderRadius: 40,
  },

  iconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D81F1F',
    height: 40,
    width: 40,
    borderRadius: 100,
  },

  iconStyle1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#005696',
    height: 40,
    width: 40,
    borderRadius: 100,
  },

  backButtonStyle: {
    alignSelf: 'flex-start',
    marginLeft: wp('2%'),
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
    backgroundColor: '#fff',
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  buttonText: {
    textAlign: 'center',
  },

  stext: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: 'rgba(255,255,255,1)',
    opacity: 10,
    marginTop: 11,
    width: 270,
    textAlign: 'center',
    marginBottom: 4,
  },

  subSection: {
    width: wp('64%'),
    height: 40,
    backgroundColor: '#FECE05',
    borderRadius: 30,
    justifyContent: 'center',
  },

  innertext: {
    fontStyle: 'normal',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#002456',
    textAlign: 'center',
  },
  BarsButtonStyle: {
    color: 'black',
    paddingTop: hp('2%'),
    paddingLeft: hp('2%'),
  },
  imageStyle: {
    height: hp('10%'),
    width: wp('20%'),
    borderRadius: hp('10%'),
  },
});
