import React, { Component } from 'react';
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', nameAvailable:false, isValid:true};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {

    let Name = this.state.value;
    let letters = /^[A-Za-z]+$/;
      if(l/^[A-Za-z]+$/.test(this.state.value))
      {
        this.setState({nameAvailable:true});

      }
      else
      {
        this.setState({isValid:false});

      }


    event.preventDefault();
  }

  render() {
    let returnArray = []
    if(!this.state.nameAvailable) {
      returnArray.push(
      <View><form onSubmit={this.handleSubmit} key = "main">
        <label>
          <View>Name:</View>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form></View>
    );
    if(!this.state.isValid)
    returnArray.push(
      <View><p key = "error" class = "errortext"> Must be a valid a-z or A-Z and non-ascii characters</p></View>
    );
    return returnArray;
  }else {
    return (<View> Hello, My first user: {this.state.value}</View>);
  }
  }
}
