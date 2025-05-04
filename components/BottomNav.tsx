import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



import type { NavigationProp } from '@react-navigation/native';

export default function BottomNav({ navigation }: { navigation: NavigationProp<any> }) {
  const routes = [
    { name: 'Home', icon: 'home-outline' },
    { name: 'Explore', icon: 'search-outline' },
    { name: 'Library', icon: 'library-outline' },
    { name: 'Profile', icon: 'person-outline' },
  ];

  return (
    <View style={styles.container}>
      {routes.map(({ name, icon }) => (
        <TouchableOpacity key={name} onPress={() => navigation.navigate(name)} style={styles.button}>
          <Ionicons name={icon as any} size={24} color="black" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
  },
});
