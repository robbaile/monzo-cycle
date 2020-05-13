import React from 'react';
import logo from './logo.svg';
import './css/app.css';
import axios from 'axios';

class App extends React.Component {
  handleClick = () => {
    axios.get("/login")
      .then(res => {
        window.location.href = `https://auth.monzo.com/?client_id=${res.data.id}&redirect_uri=${res.data.redirect_url}&response_type=code` 
        console.log(res);
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <div className="page">
          <h1>Lets get started</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <div className="page__section">
            <p>Enter your monzo email below</p>
            <button onClick={this.handleClick} className="page__form--button">Go</button>
          </div>
          <div className="page__background"></div>
      </div>
    );
  }
}

export default App;
