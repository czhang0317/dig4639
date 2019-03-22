import React, { Component } from 'react'
import { View, Text,  Switch, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import SwitchExample from './1.js';
import PhotoBackdrop from './PhotoBackdrop/local_image';
import Button from "./Button";

export default class HomeContainer extends Component {
   constructor() {
      super();
      title: 'Settings',
      this.state = { text: 'Useless Placeholder' };
      this.state = {
         switch1Value: false,
      }
   }
   static navigationOptions = {
     //Setting the header of the screen
     title: 'Settings',
   };

   toggleSwitch1 = (value) => {
      this.setState({switch1Value: value})
      console.log('Switch is: ' + value)
   }
   onSubmitEdit = () => {
     // whatever you want to do on submit
   }
   checkMultiPermissions = async() => {
     const { Permissions, FileSystem } = Expo;
     console.log(FileSystem.documentDirectory);
     let { status, expires, permissions } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
     if (status !== 'granted') {
       console.log('Hey! You heve not enabled selected permissions');
       const { newStatus, expires, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
       status = newStatus;
     }
     if(status === 'granted') {
         console.log("Granted!");
         let result = await Expo.ImagePicker.launchImageLibraryAsync({
           allowsEditing: true,
         })

         console.log(result);
           if (!result.cancelled) {
             console.log(this);
             console.log("Accepted!");
             this.setState({ newPostImage:result.uri, createPostModalVisible: true })
             FileSystem.copyAsync({from:result.uri,to:FileSystem.documentDirectory+"myimage.jpg"})
             .then(() => console.log("Moved to location"));
             try {
               await AsyncStorage.setItem('@MySuperStore:key', result.uri)
               .then(() => console.log("Saved selection to disk: " + result.uri))
               .catch(error => console.error("AsyncStorage error: " + error.message))
               .done();
               console.log("saved");
               this._retrieveData();
             } catch (error) {
               // Error saving data
             }
           }
       }

   }
   _retrieveData = async () => {
       console.log("Retrieving Data");
         try {
           const value = await AsyncStorage.getItem('@MySuperStore:key');
           if (value !== null) {
             // We have data!!
             console.log("Got data");
             console.log(value);
             this.setState({ newPostImage:value, createPostModalVisible: true })
           } else {
             console.log("No data");
           }
         } catch (error) {
           console.log(error);
           // Error retrieving data
         }
       }


   render() {
      return (
        <PhotoBackdrop image={this.state.newPostImage} >
         <View style = {styles.text}>
          <Text style = {styles.text}>
          °F / °C
          </Text>
            <SwitchExample
            toggleSwitch1 = {this.toggleSwitch1}
            switch1Value = {this.state.switch1Value}/>


      <TextInput style = {styles.input}
        onSubmitEditing={this.onSubmitEdit}


      />
      <TouchableHighlight
      style = {styles.button}
      onPress={this.onSubmitEdit}>
        <Text style = {styles.text1}>Submit</Text>
      </TouchableHighlight>
                <Text style = {styles.inputext}>
          Set a time before moving to next
          </Text>


            <Button onPress={this.checkMultiPermissions} label="Choose Image"></Button>

         </View>
</PhotoBackdrop>
      );
   }
}
const styles = StyleSheet.create ({
   text: {
      marginTop: 50,
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 25,
   },
   input: {
     fontSize: 20,
     textAlign: 'center',
     backgroundColor: "white",
      marginTop: 100,
      width: 50,
      height: 60,
      borderColor: 'lightgray',
      borderWidth: 3
    },
    inputext: {
      marginTop: 20,
      fontSize: 20,
      marginBottom: 50
    },
    button: {
      borderColor: "darkblue",
      backgroundColor: "darkblue",
      borderWidth: 4,
      marginTop: 10,
      height: 30,
      width: 60,
      borderRadius: 5
    },
    text1: {
      alignItems: 'center',
      textAlign: 'center',
      fontWeight: 'bold',
      color: "white"
    }
})
