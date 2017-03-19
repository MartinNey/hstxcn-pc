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
    };
  }
  componentWillMount() {
    this.loadProfile();
  }
  loadProfile() {
    axios({
      url: '/api/profile',
      headers: {
        Authorization: this.state.auth,
      },
      method: 'get'
    }).then((res) => {
      this.profileParser(res.data);
    }).catch((err) => {
        //go to login page
        // window.location = '/login';
        // console.log(err);
    });
  }
  profileParser(rowData) {
    // as I just need to remove collection var from rowData
    /*eslint no-unused-vars: off*/
    const {id, status, collection, ...other} = rowData;
    const profile = {
      status: status || 'reviewed',
      id: id,
    };
    for (let props in {...other}) {
      profile[props] = {
        value: null,
        readOnly: false,
      };
      profile[props].value = {...other}[props];
      profile[props].readOnly = (props === 'name' || props === 'likes');
    }
    axios({
      url: '/api/user/collection',
      headers: {
        Authorization: this.state.auth,
      },
      method: 'get'
    }).then((res) => {
      profile['collection'] = {
        value: res.data,
        readOnly: false
      };
      this.setState({
        profile: profile
      });
    }).catch((err) => {
      // this.setState({
      //   profile: profile
      // });
      //maybe try again??
    });

    // {"id": "2487bf181a004b1c8a8ad7c982ddc72b",
    //   "name": "su",
    //   "likes": 0,
    //   "imagelink": null,
    //   "major": null,
    //   "number": 0,
    //   "sex": true,
    //   "description": "1",
    //   "tags": [],
    //   "email": "youpaihust@163.com",
    //   "status": "admin",
    //   collection": null}

    // this.setState({
    //   profile: res.data
    // });
  }
  render() {
    const profileForm = () => (
      <ProfileForm
        profile={this.state.profile || {}}
        auth={this.state.auth}
      />
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
                  <Link to="/profile/">账号</Link>
                </div>):
                (<div>
                  <Link to="/profile">账号管理</Link>
                  <Link to="/change-password">更改密码</Link>
                </div>)
              }
            </h2>
          </nav>
          <Route path="/profile" component={profileForm} />
          <Route path="/profile/:id" component={profileForm} />
          <Route path="/admin" component={admin} />
        </div>
      </Router>
    );
  }
}

export default App;
