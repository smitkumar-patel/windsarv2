import {createStackNavigator} from '@react-navigation/stack';
import {
  createAppContainer,
  NavigationContainer,
} from '@react-navigation/native';
import React, {useState} from 'react';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import SignupAs from './SignupAs';
import UserNavigator from './UserNavigator';
import BussinessNavigator from './BussinessNavigator';
import BusinessSignupPage from './BussinessSignupPage';
import {Provider} from 'react-redux';
import configureStore from '../redux';
import SplashScreen from './SplashScreen';

const Stack = createStackNavigator();
const store = configureStore();
const Navigator = () => {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          component={SplashScreen}>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Navigator"
            component={Navigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Welcome"
            component={LandingPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignupAs"
            component={SignupAs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignupPage"
            component={SignupPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserHomePage"
            component={UserNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BussinessSignupPage"
            component={BusinessSignupPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BussinessHomePage"
            component={BussinessNavigator}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Navigator;
