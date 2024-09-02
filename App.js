import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Test from './src/screens/test/Test';
import HomeScreen from './src/screens/test/Home/HomeScreen';
import SavingsScreen from './src/screens/test/Savings/SavingsScreen';
import LoanScreen from './src/screens/test/Loan/LoanScreen';
import SplashScreen from 'react-native-splash-screen';
import SignIn from './src/screens/main/login/SignIn';
import Signup from './src/screens/auth/Signup';
import {Profile} from './src/screens/profile/Profile';
import Reservations from './src/screens/reservation/Reservations';
import {Reservation} from './src/screens/reservation/Reservation';
import Login from './src/screens/auth/Login';
import ReservationMain from './src/screens/reservation/ReservationMain';
import NewShare from './src/screens/share/NewShare';
import Shares from './src/screens/share/Shares';
import ShareMain from './src/screens/share/ShareMain';
import BottomNavigation from './src/screens/navigation/BottomNavigation';
import MyShares from './src/screens/share/MyShares';
import { SharesContext, SharesContextProvider } from './src/context/sharesContext';
import Savings from './src/screens/test/Home/Savings';
import Loan from './src/screens/test/Home/Loan';
import { HomePage } from './src/screens/horizon/HomePage';
import ApprovedShares from './src/screens/admin/ApprovedShares';
import AdminLogin from './src/screens/auth/AdminLogin';
import AdminSignup from './src/screens/auth/AdminSignup';
import PendingShares from './src/screens/admin/PendingShares';
import AdminNav from './src/screens/navigation/AdminNav';
// import {Navigation} from './src/screens/navigation/Navigation';

const Stack = createNativeStackNavigator();

const App = () => {
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 2000);
  }, []);

  return (
    <SharesContextProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/*<Stack.Screen name="signin" component={SignIn} />*/}
        {/*<Stack.Screen name="homepage" component={HomePage} />
        <Stack.Screen name="savingsscreen" component={Savings} />
        <Stack.Screen name="loanscreen" component={Loan} />*/}
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="shares" component={Shares} />
        <Stack.Screen name="myshares" component={MyShares} />
        <Stack.Screen name="homescrreen" component={HomeScreen} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="newshare" component={NewShare} />
        <Stack.Screen name="bottomnavigation" component={BottomNavigation} />
        <Stack.Screen name="adminnavigation" component={AdminNav} />
        <Stack.Screen name="admin-login" component={AdminLogin} />
        <Stack.Screen name="admin-signup" component={AdminSignup} />
        <Stack.Screen name="admin-shares-approved" component={ApprovedShares} />
        <Stack.Screen name="admin-shares-rejected" component={PendingShares} />     
      </Stack.Navigator>
    </NavigationContainer>
    </SharesContextProvider>
  );
};

export default App;
