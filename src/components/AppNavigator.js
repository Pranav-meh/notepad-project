import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import CreateAccount from "../screens/CreateAccount";
import ForgotPassword from '../screens/forgotpasswordScreen';
import Login from '../screens/Login';
import { TouchableOpacity, Text } from 'react-native';
import Dashboard from "../screens/Dashboard";

const Stack = createStackNavigator();

const defaultHeaderOptions = {
  headerShown: true,
  title: '',
  headerLeft: ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ marginLeft: 10 }}>
      <Text style={{ fontSize: 24, color: 'black' }}>{'<'}</Text>
    </TouchableOpacity>
  ),
  headerStyle: {
    height: 50,
    elevation: 0,
    shadowOpacity: 0,
  },
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
