import React, { Component } from 'react';
import cookie from 'react-cookie';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import ProfileForm from './components/profile-form.js';
import './App.css';
import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: cookie.load('auth'),
      profile: {
        status: null,
      },
      collections: null,
      options: null
    };
    this.loadProfile = this.loadProfile.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    this.loadCollections = this.loadCollections.bind(this);
  }
  componentWillMount() {
    this.loadProfile();
    this.loadOptions();
    this.loadCollections();
  }
  loadProfile() {
    axios({
      url: '/api/profile',
      headers: {
        Authorization: this.state.auth,
      },
      method: 'get'
    }).then((res) => {
      this.setState({
        profile: App.profileParser(res.data)
      });
    }).catch((err) => {
      //TODO: error handler
    });
  }
  static profileParser(rowData) {
    // as I just need to remove collection var from rowData
    /*eslint no-unused-vars: off*/
    const {id, status, collection, ...other} = rowData;
    const profile = {
      status: status || 'reviewed',
      tags: {
        readOnly: false,
        value: []
      },
      id: id,
    };
    for (let props in {...other}) {
      if ({...other}.hasOwnProperty(props)) {
        profile[props] = {
          value: null,
          readOnly: false,
        };
        if (props === 'tags') {
          profile[props].value = {...other}[props].map((value) => value.text);
        } else {
          profile[props].value = {...other}[props];
        }
        profile[props].readOnly = (
          // readonly is true while
          !['reviewed', 'admin'].includes(profile.status) ||
          ['name', 'email', 'likes'].includes(props)
        );
      }
    }
    return profile;
  }
  loadOptions() {
    axios({
      url: '/api/photographer/option',
      headers: {
        Authorization: this.state.auth,
      },
      method: 'get'
    }).then((res) => {
      this.setState({
        options: res.data
      });
    }).catch((err) => {
      return err.data;
    });
  }
  loadCollections() {
    axios({
      url: '/api/user/collection',
      headers: {
        Authorization: this.state.auth,
      },
      method: 'get'
    }).then((res) => {
      this.setState({
        collections: res.data
      });
    }).catch((err) => {
      // TODO: error handler
    });
  }
  render() {
    const adminProfiles = () => (
      <ProfileForm
        profile={this.state.profile || {}}
        auth={this.state.auth}
      />
    );
    const profileForm = () => (
      <ProfileForm
        profile={this.state.profile || {}}
        options={this.state.options || {}}
        auth={this.state.auth}
      />
    );
    const collections = () => (
      <div>collections</div>
    );
    const admin = () => {
      if (this.state.profile.status !== 'admin') {
        window.location = '/manage';
      } else {
        return (<div>Admin</div>);
      }
    };
    return (
      <Router>
        <div className="app">
          <nav>
            <img src={logo} className="app-logo" alt="logo" />
            <h2 className="app-intro">
              友拍
            </h2>
            <h2 className="user-info">
              {
                this.state.profile.status === null ?
                (<div>Loading...</div>):
                (<div>USER: {this.state.profile.name.value}</div>)
              }
            </h2>
            <h2 className="user-info">
              {
                this.state.profile.status === 'admin' ?
                (<div>
                  <Link to="/admin">首页</Link>
                  <Link to="/admin/profiles">账号</Link>
                </div>):
                (<div>
                  <Link to="/profile">账号管理</Link>
                  <Link to="/collections">图集管理</Link>
                  <Link to="/change-password">更改密码</Link>
                </div>)
              }
            </h2>
          </nav>
          <Route path="/admin" component={admin}>
            <Route path="/profiles/:id" component={adminProfiles}/>
          </Route>
          <Route path="/profile" component={profileForm} />
          <Route path="/collections" component={collections} />
          {/*<Route path="/profile/:id" component={profileForm} />*/}
        </div>
      </Router>
    );
  }
}

export default App;
