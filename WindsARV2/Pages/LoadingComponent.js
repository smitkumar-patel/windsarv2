import React from 'react';
import {StyleSheet, ActivityIndicator, Text, View} from 'react-native';

const LoadingComponent = () => {
  return (
    <>
      <View style={styles.laoder}>
        <ActivityIndicator size={70} color="green" />
      </View>
    </>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  laoder: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
