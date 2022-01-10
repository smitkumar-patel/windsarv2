import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';

const APICall = () => {
  const [data, setData] = useState(null);
  const getData = () => {
    fetch('https://api.github.com/users/neeljadav').then(response =>
      response.json().then(fg => setData(fg)),
    );
  };
  return (
    <View>
      <TouchableOpacity onPress={getData}>
        <Text>Click here</Text>
      </TouchableOpacity>
      <Text>{JSON.stringify(data)}</Text>
      {data ? (
        <>
          <Text style={{paddingTop: 20}}> Name from API is : {data.login}</Text>
          <Image
            style={{
              height: '20%',
              width: '30%',
              marginLeft: '30%',
              alignContent: 'center',
              justifyContent: 'center',
            }}
            source={{
              uri: data.avatar_url,
            }}
          />
        </>
      ) : (
        <Text>Press to get data</Text>
      )}
    </View>
  );
};

export default APICall;
