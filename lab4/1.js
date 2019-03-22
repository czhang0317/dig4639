import React, { Component } from 'react'
import { View, Switch, StyleSheet, Text }

from 'react-native'

export default SwitchExample = (props) => {
   return (
      <View style = {styles.container}>
         <Switch
         onValueChange = {props.toggleSwitch1}
         value = {props.switch1Value}/>
         <Text style = {styles.text}>
         °F to °C
         </Text>
      </View>
   )
}
const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 10
   },
   text: {
     fontSize: 30
   }
})
