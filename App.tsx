import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faList,
  faCog,
  faUser,
  faMap,
  faCartShopping,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons';

import FontLoader from './components/FontsLoader';
import Home from './screens/Home';
import Rent from './screens/Rent';
import Map from './screens/Map';
import Login from './screens/Login';
import Register from './screens/Register';

const homeName = 'Home';
const MapName = 'Map';
const RentName = 'Rent';
const LoginName = 'Login';
const RegisterName = 'Register';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FontLoader>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={{
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: { fontSize: 16, marginBottom: -20 },
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
            }
          }}
        >
          <Tab.Screen
            name={homeName}
            component={Home}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <>
                <FontAwesomeIcon
                  icon={faHome}
                  size={size}
                  color={focused ? 'tomato' : 'grey'}
                />
                <Text style={{ color: focused ? 'tomato' : 'grey', marginTop: 15 }}>{homeName}</Text>
                </>
              )
            }}
          />
          <Tab.Screen
            name={MapName}
            component={Map}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <>
                <FontAwesomeIcon
                  icon={faMap}
                  size={size}
                  color={focused ? 'tomato' : 'grey'}
                />
                <Text style={{ color: focused ? 'tomato' : 'grey', marginTop: 15 }}>{MapName}</Text>
                </>
              )
            }}
          />
          <Tab.Screen
            name={RentName}
            component={Rent}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  size={size}
                  color={focused ? 'tomato' : 'grey'}
                />
                <Text style={{ color: focused ? 'tomato' : 'grey', marginTop: 15 }}>{MapName}</Text>
                </>
              )
            }}
          />
          <Tab.Screen
            name={LoginName}
            component={Login}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <>
                <FontAwesomeIcon
                  icon={faUser}
                  size={size}
                  color={focused ? 'tomato' : 'grey'}
                />
                <Text style={{ color: focused ? 'tomato' : 'grey', marginTop: 15 }}>{LoginName}</Text>
                </>
              )
            }}
          />
          <Tab.Screen
            name={RegisterName}
            component={Register}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <>
                <FontAwesomeIcon
                  icon={faCog}
                  size={size}
                  color={focused ? 'tomato' : 'grey'}
                />
                <Text style={{ color: focused ? 'tomato' : 'grey', marginTop: 15 }}>{RegisterName}</Text>
                </>
              )
            }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </FontLoader>
  );
}
