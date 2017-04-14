import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import SignForm from './components/sign-form';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-main">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>You Pai</h2>
          <SignForm>
          </SignForm>
        </div>
      </div>
    );
  }
}

export default App;
