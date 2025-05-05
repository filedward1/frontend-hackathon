import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

export default function BottomNav() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute(); // ✅ This tells you the current screen

const routes = [
  { name: 'Home', icon: 'home', activeIcon: 'home' },
  { name: 'Result', icon: 'compass', activeIcon: 'compass' },
  { name: 'Library', icon: 'heart', activeIcon: 'heart' },
  { name: 'Profile', icon: 'person', activeIcon: 'person' },
];


  return (
    <View style={styles.container}>
      {routes.map(({ name, icon }) => {
        const isActive = route.name === name; // ✅ Check if this tab is active
        return (
          <TouchableOpacity
            key={name}
            onPress={() => navigation.navigate(name as keyof RootStackParamList)}
            style={styles.button}
          >
            <Ionicons
              name={icon as any}
              size={25}
              color={isActive ? '#0c092a' : '#999'} // Blue if active, gray if not
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    paddingBottom: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    shadowColor: '#062B2D',
  shadowOffset: {
    width: 0,
    height: -10,
  },
  shadowOpacity: 0.1,
  shadowRadius: 40,
  },
  button: {
    alignItems: 'center',
  },
});
