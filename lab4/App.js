import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './weather_project';
import Settings from './setting';
import {createStackNavigator,createAppContainer} from 'react-navigation';

const App = createStackNavigator({
    Home: { screen: Home },
    Settings: { screen: Settings },
  },
);

export default createAppContainer(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
