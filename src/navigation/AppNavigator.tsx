/**
 * App Navigator
 * Main navigation stack configuration
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@screens/HomeScreen';
import { UserDetailScreen } from '@screens/UserDetailScreen';
import { COLORS } from '@constants';
import type { RootStackParamList } from '@types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerShadowVisible: true,
          headerBackTitle: 'Back', // Empty string to hide back button text
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Users Directory',
          }}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={{
            title: 'User Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
