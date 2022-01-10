import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import UserHomePage from './UserHomePage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BussinessMenuContent from './BussinessMenuContent';
import BussinessVouchers from './BussinessVouchers';
import BusinessAddVoucher from './BusinessAddVoucher';
import Navigator from './Navigator';
const Drawer = createDrawerNavigator();

const BussinessNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        drawerContent={props => <BussinessMenuContent {...props} />}
        initialRouteName="BussinessVouchers"
        drawerStyle={{width: wp('100%')}}>
        <Drawer.Screen
          name="BussinessVouchers"
          component={BussinessVouchers}></Drawer.Screen>
        <Drawer.Screen
          name="AddVoucher"
          component={BusinessAddVoucher}></Drawer.Screen>
        <Drawer.Screen name="Navigator" component={Navigator}></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default BussinessNavigator;
