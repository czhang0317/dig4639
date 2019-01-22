import React, { Component } from 'react';
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    let Name = this.state.value;
    let letters = /^[A-Za-z]+$/;
      if(Name.match(letters))
      {
      document.write("Hello My First User:" + " " + Name);
      return true;
      }
      else
      {
      alert('the user used non-ascii characters');
      return false;
      }


    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

    export default NameForm;
