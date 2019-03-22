import React, { Component } from 'react'
import { View, Text,  Switch, StyleSheet, TextInput } from 'react-native'
import SwitchExample from './1.js'

export default class HomeContainer extends Component {
   constructor() {
      super();
      this.state = { text: 'Useless Placeholder' };
      this.state = {
         switch1Value: false,
      }
   }
   toggleSwitch1 = (value) => {
      this.setState({switch1Value: value})
      console.log('Switch 1 is: ' + value)
   }
   render() {
      return (
         <View>
          <Text style = {styles.text}>
          °F / °C
          </Text>
            <SwitchExample
            toggleSwitch1 = {this.toggleSwitch1}
            switch1Value = {this.state.switch1Value}/>


      <TextInput style = {styles.input}

        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
                <Text style = {styles.inputext}>
          Set a time before moving to next
          </Text>

         </View>

      );
   }
}
const styles = StyleSheet.create ({
   text: {
      marginTop: 50,
      alignItems: 'center',
      textAlign: 'center',
   },
   input: {
      marginLeft: 30,
      width: 60,
      height: 60,
      borderColor: 'gray',
      borderWidth: 5
    },
  inputext: {
      marginLeft: 30,
    }
})
