import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from './src/components/coins/CoinsStack';
import FavoritesStack from './src/components/Favorites/FavoritesStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from './src/res/colors';

const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.charade,
            borderTopColor: Colors.blackPearl
          },
          tabBarIconStyle: {
            tintColor: Colors.white
          }
        }}
      >
        <Tabs.Screen
          name="Coin"
          component={CoinsStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Image
                style={{ tintColor: color, width: size, height: size }}
                source={require('./src/assets/bank.png')}
              />
            )
          }}
        />
        <Tabs.Screen
          name="Favorite"
          component={FavoritesStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Image
                style={{ tintColor: color, width: size, height: size }}
                source={require('./src/assets/star.png')}
              />
            )
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

