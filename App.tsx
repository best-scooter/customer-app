import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Home from './screens/Home';
import Rent from './screens/Rent';
import Map from './screens/Map';
import Login from './screens/Login';
import Register from './screens/Register';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontLoader from './components/FontsLoader';

const homeName = 'Home';
const MapName = 'Map';
const RentName = 'Rent';
const LoginName = 'Login';
const RegisterName = 'Register'; //remove later just here for testing after ill have a link from login page

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FontLoader>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              elevation: 8,
              backgroundColor: '#fff',
              borderTopWidth: 1,
              borderTopColor: 'lightgrey',
              height: 60,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center'
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;
              if (rn === homeName) {
                iconName = focused ? 'home' : 'home-outline';
              } else if (rn === MapName) {
                iconName = focused ? 'list' : 'list-outline';
              } else if (rn === RentName) {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (rn === LoginName) {
                iconName = focused ? 'settings' : 'settings-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          })}
        >
          <Tab.Screen name={homeName} component={Home} />
          <Tab.Screen name={MapName} component={Map} />
          <Tab.Screen name={RentName} component={Rent} />
          <Tab.Screen name={LoginName} component={Login} />
          <Tab.Screen name={RegisterName} component={Register} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </FontLoader>
  );
}
