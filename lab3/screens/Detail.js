import React from 'react';
import { StyleSheet, Image, Text, View, ImageBackground } from 'react-native';

export default class Detail extends React.Component {
  static navigationOptions = {
    title: 'Cat Details',
  };


  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}

          source={require('../assets/images/bg.jpg')}

        >

        <View style={styles.MainContainer}>
          <Image
source={require('../assets/images/bc.jpg')}
            style={{ width: 200, height: 200, marginTop: 10 }}
          />
          <Text style={styles.TextStyle}>This App will keep updating the images for cats!!</Text>
        </View>
      </ImageBackground>

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
