import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './app/Home';
import Explore from './app/Explore';
import Library from './app/Library';
import Profile from './app/Profile';
import Quiz from './app/Quiz';
import Result from './app/Result';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Library" component={Library} />
        <Stack.Screen name="Profile" component={Quiz} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
