import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackArrow from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {updateBusinessVoucherData} from '../redux/user/action';
const BusinessAddVoucher = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [aPrice, setAPrice] = useState(-1);
  const [dPrice, setDPrice] = useState(-1);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  const {businessVoucherData} = useSelector(state => state.business);
  const [errorMessages, setErrorMessages] = useState({
    nameError: '',
    isName: true,
    aPriceError: '',
    isAPriceError: true,
    dPriceError: '',
    isDPriceError: true,
    expiryDateError: '',
    isExpiryDateError: true,
  });
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
    setExpiryDate(formattedDate);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  function validateInput() {
    const startRegex = /^[a-zA-Z]/;
    const numberRegex = /^[0-9]*$/;
    let temp = errorMessages;
    if (name.length == 0) {
      temp = {...temp, nameError: 'Please enter name', isName: false};
    } else {
      temp = {...temp, nameError: '', isName: true};
    }
    if (aPrice < 0) {
      temp = {
        ...temp,
        aPriceError: 'Please enter valid price',
        isAPriceError: false,
      };
    } else if (!numberRegex.test(aPrice)) {
      temp = {
        ...temp,
        aPriceError: 'Please enter valid price',
        isAPriceError: false,
      };
    } else {
      temp = {...temp, aPriceError: '', isAPriceError: true};
    }

    if (dPrice < 0) {
      temp = {
        ...temp,
        dPriceError: 'Please enter valid price',
        isDPriceError: false,
      };
    } else if (!numberRegex.test(dPrice)) {
      temp = {
        ...temp,
        dPriceError: 'Please enter valid price',
        isDPriceError: false,
      };
    } else {
      temp = {...temp, dPriceError: '', isDPriceError: true};
    }

    if (expiryDate.length == 0) {
      temp = {
        ...temp,
        expiryDateError: 'Please enter expiry date',
        isExpiryDateError: false,
      };
    } else {
      temp = {
        ...temp,
        expiryDateError: '',
        isExpiryDateError: true,
      };
    }
    setErrorMessages(temp);
    if (
      temp.isName &&
      temp.isAPriceError &&
      temp.isDPriceError &&
      temp.isExpiryDateError
    ) {
      setVoucherData();
    }
  }
  const setVoucherData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    let response = await fetch('https://windsarv2.herokuapp.com/addVoucher', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        productName: name,
        discountPrice: dPrice,
        actualPrice: aPrice,
        expiryDate: expiryDate,
      }),
    });
    let recievedReponse = await response.json();
    if (recievedReponse.success == 'true') {
      alert('Voucher added');
      navigation.goBack();
    } else {
      alert(recievedReponse.message);
      console.log(recievedReponse);
    }
    let percentage = ((aPrice - dPrice) * 100) / aPrice;
    dispatch(
      updateBusinessVoucherData([
        {
          id: businessVoucherData.length + 1,
          image:
            'https://media.blogto.com/articles/20210122-hong-shing.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70',
          discount:
            Math.floor(dPrice) +
            '% off on ' +
            recievedReponse.productName +
            '  by ' +
            recievedReponse.businessName,
          subText: recievedReponse.expiryDate,
          winCoins: recievedReponse.winCoins,
        },
      ]),
    );
  };
  const getBusinessVoucherData = () => {
    dispatch(
      updateBusinessVoucherData([
        {
          id: 7,
          image:
            'https://www.tasteofhome.com/wp-content/uploads/2019/05/ice-cream-sundae-shutterstock_401521909.jpg',
          discount: '1000000% off on Ice-cream by IceVille',
          subText: 'Expires in 1111111 days',
          winCoins: 5555,
        },
      ]),
    );
  };
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'white', flex: 0.1}}>
        <BackArrow
          name="arrow-back"
          size={wp('8%')}
          style={styles.backButtonStyle}
          onPress={() => navigation.goBack()}></BackArrow>
      </View>
      <View style={styles.half1}>
        <Text style={styles.editProfileText}>Add Voucher</Text>
      </View>
      <View style={styles.half2}>
        <Text style={styles.inputText}>Name : </Text>
        <TextInput style={styles.input} onChangeText={data => setName(data)} />
        <Text style={styles.errorText}>{errorMessages.nameError}</Text>

        <Text style={styles.inputText}>Actual Price : </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={data => setAPrice(data)}
        />
        <Text style={styles.errorText}>{errorMessages.aPriceError}</Text>

        <Text style={styles.inputText}>Discounted Price : </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={data => setDPrice(data)}
        />
        <Text style={styles.errorText}>{errorMessages.dPriceError}</Text>

        <Text style={styles.inputText}>Expiry Date : </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TextInput
            placeholder={expiryDate}
            editable={false}
            style={styles.input2}
          />
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
        <Text style={styles.errorText}>{errorMessages.expiryDateError}</Text>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => validateInput()}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BusinessAddVoucher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButtonStyle: {
    paddingLeft: wp('1%'),
    paddingTop: hp('1%'),
    backgroundColor: 'white',
    width: wp('9%'),
  },
  half1: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: hp('-1%'),
    textAlign: 'right',
    color: 'red',
    paddingLeft: wp('15%'),
    paddingRight: wp('10%'),
    fontSize: hp('1.8%'),
  },
  editProfileText: {
    fontSize: hp('5%'),
    color: Colors.APP_BLUE,
    fontWeight: 'bold',
  },
  half2: {
    paddingTop: hp('5%'),
    flex: 0.75,
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
  input2: {
    margin: hp('1.5%'),
    height: hp('6.2%'),
    width: wp('68%'),
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
