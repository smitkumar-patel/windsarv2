import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import UserHomePage from './UserHomePage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import UserMenuContent from './UserMenuContent';
import ProfilePage from './ProfilePage';
import UserVouchers from './UserVouchers';
import UserHelp from './UserHelp';
import UserLocationHistory from './UserLocationHistory';
import Navigator from './Navigator';
const Drawer = createDrawerNavigator();

const UserNavigator = ({route}) => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        drawerContent={props => <UserMenuContent {...props} />}
        initialRouteName="UserHomePage"
        drawerStyle={{width: wp('100%')}}>
        <Drawer.Screen
          name="UserHomePage"
          component={UserHomePage}
          initialParams={route.params}></Drawer.Screen>
        <Drawer.Screen
          name="ProfilePage"
          component={ProfilePage}></Drawer.Screen>
        <Drawer.Screen
          name="UserVouchers"
          component={UserVouchers}></Drawer.Screen>
        <Drawer.Screen name="UserHelp" component={UserHelp}></Drawer.Screen>
        <Drawer.Screen
          name="UserLocationHistory"
          component={UserLocationHistory}></Drawer.Screen>
        <Drawer.Screen name="Navigator" component={Navigator}></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default UserNavigator;
