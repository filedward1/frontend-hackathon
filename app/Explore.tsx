import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNav from '../components/BottomNav';

export default function Explore() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Explore Screen</Text>
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative', backgroundColor: '#fff' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 80 },
  text: { fontSize: 24, fontWeight: 'bold' },
});
