import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import Weather from '../screens/Weather';
import SelectCity from '../screens/SelectCity';

export type StackParamList = {
  Weather: {
    city: string;
  };
  SelectCity: {
    currentCity: string | null;
  };
};

const Stack = createStackNavigator<StackParamList>();

export interface IStackNavigation extends StackNavigationProp<StackParamList> {}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Weather"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen name="SelectCity" component={SelectCity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
