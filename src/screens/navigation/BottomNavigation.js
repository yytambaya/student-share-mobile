import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Profile } from '../profile/Profile';
import Shares from '../share/Shares';
import ShareResource from '../share/NewShare';
import MyShares from '../share/MyShares';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigation = () => {
  return (
      <Tab.Navigator
        initialRouteName="Resources"
        activeColor="white"
        inactiveColor="#6EACDA"
        barStyle={{ backgroundColor: '#03346E' }}
      >
        <Tab.Screen
          name="Resources"
          component={Shares}
          options={{
            tabBarLabel: 'Resources',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="book" color={'#021526'} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Share"
          component={ShareResource}
          options={{
            tabBarLabel: 'Share',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="plus-box" color={"#021526"} size={26} />
            ),
          }}
        />

        <Tab.Screen
                name="MyResources"
                component={MyShares}
                options={{
                    tabBarLabel: 'My Resources',
                    tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="book" color={'#021526'} size={26} />
                    ),
                }}
                />
        
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons size={32} color="#021526" name="account" />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default BottomNavigation;
