import React, {useState} from 'react';
import {View, Platform, Image, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
export const DOBComponent = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
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
    <View>
      <View>
        <TouchableOpacity onPress={showDatepicker}>
          <Image
            source={require('./datelogo.jpg')}
            style={{
              height: 50,
              width: 50,
              marginTop: '20%',
            }}></Image>
        </TouchableOpacity>
      </View>
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
  );
};
