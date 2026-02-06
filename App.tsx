/**
 * App Entry Point
 * Main application component
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '@constants';
import { ComponentShowcase } from './src/components/demos';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ComponentShowcase />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
