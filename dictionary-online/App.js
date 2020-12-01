import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {Header} from 'react-native-elements';
import HomeScreen from './screens/HomeScreen';

export default class App extends React.Component {
  render() {
     return (
    <View>
      <AppContainer/> 
    </View>
  );
  }
}

var AppNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen
});

const AppContainer = createAppContainer(AppNavigator);

