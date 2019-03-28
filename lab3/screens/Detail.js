import React from 'react';
import { StyleSheet,
    Image,
    Text,
    View,
    } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    let title = this.props.navigation.getParam
    ("Title", "Cart1");
    let image = this.props.navigation.getParam
    ("Image", undefined);
    return (
      <View><Text>{title}</Text><Image source={image} style={{

    resizeMode: 'cover', // or 'stretch',
    justifyContent: 'center',
  }}></Image></View>

    );

  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  TextStyle: {
    color: '#0250a3',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
});
