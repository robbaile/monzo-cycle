import React from 'react';
import logo from './logo.svg';
import './css/app.css';
import axios from 'axios';

class App extends React.Component {
  state = {
    email: "",
  };

  handleChange = event => {
    this.setState({ email: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const email = {
      email: this.state.email
    };

    axios.post("http://localhost:8000/api/email", email)
      .then(res => {
        console.log(res);
        this.setState({email: ''})
        event.value = ""
      })
  }

  render() {
    return (
      <div className="page">
          <h1>Lets get started</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <div className="page__section">
            <p>Enter your monzo email below</p>
            <form onSubmit={this.handleSubmit} method="POST" action="/api/user" className="page__form">
              <input onChange={this.handleChange} className="page__form--input" type="text" name="monzo-email" value={this.state.email} placeholder="email" />
              <button className="page__form--button" type="submit">Go</button>
            </form>
          </div>
          <div className="page__background"></div>
      </div>
    );
  }
}

export default App;
