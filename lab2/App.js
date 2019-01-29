import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', nameAvailable:false, Valid:true};

    this.onPress = this.onPress.bind(this);
  }
  onChange(event) {
    console.log(event);
  }

  onPress(event) {

    const format = /^[A-Za-z]+$/;

    if(format.test(this.state.value))
    {
      this.setState({nameAvailable:true});

    }
    else
    {
      this.setState({Valid:false});

    }


  event.preventDefault();

    console.log("Pressed");

  }
  render() {

          return (
      <View style={styles.container} flexDirection="column" alignItems='stretch'>
        <View><TextInput style={styles.textInput} onChangeText={this.onChange} placeholder="Enter your name"></TextInput></View>
        <TouchableOpacity style={styles.buttonStyle} onPress={this.onPress}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
        {!this.state.valid ? (<Text style={styles.defaultText}>Must be a valid a-z or A-Z and non-ascii characters</Text>) : null}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  buttonText:
  {
    color:"white",
    fontSize:40
  },
  buttonStyle:
  {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'blue',
    height:75,
    margin:30,
  },
  textInput:
  {
    margin:30,
    height:75,
    fontSize:20
  },
  defaultText:
  {
    color:"red",
    fontSize:20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
