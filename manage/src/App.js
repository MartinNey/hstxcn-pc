import React, { Component } from 'react';
import cookie from 'react-cookie';
import axios from 'axios';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
// import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import {
  BrowserRouter as Router,
  browserHistory,
  Route,
  NavLink
} from 'react-router-dom';

import ProfileForm from './components/profile-form';
import Collections from './components/collections/collections';
import Collection from './components/collections/collection';
import NewCollection from "./components/collections/new-collection";
import Status from "./components/confirmation/status";
import Password from "./components/password/password";
import './App.css';
import logo from './logo.png';

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
      Alert.error('登录失败，即将跳转至登录页面');
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
        switch (props) {
          case 'tags':
            profile[props].value = {...other}[props].map((value) => value.text);
            break;
          case 'school':
            profile[props].value = {...other}[props]['id'];
            break;
          default:
            profile[props].value = {...other}[props];
        }
        profile[props].readOnly = (
          // readonly is true while
          !['reviewed', 'admin', 'confirmed'].includes(profile.status) ||
          ['email', 'likes'].includes(props)
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
    const onError = (props) => (err) => {
      if (err.response && err.response.status === 403) {
        props.history.push('/status');
        Alert.error(`账户处于审核中或未验证邮箱，请检查账户状态`);
      } else {
        Alert.error(`出错，${err}`);
      }
    };
    const commonProps = {
      auth: this.state.auth,
      onUpdate: (e) => {
        this.loadProfile();
        this.loadCollections();
      },
    };
    const admin = (props) => {
      if (this.state.profile.status !== 'admin') {
        window.location = '/manage';
        return null;
      } else {
        return (<div>Admin</div>);
      }
    };
    const profile = (props) => {
      return (
        <ProfileForm
          {...props}
          {...commonProps}
          onError={onError(props)}
          profile={this.state.profile || {}}
          options={this.state.options || {}}
        />);
    };
    const collections = (props) => {
      return (
        <Collections
          {...props}
          {...commonProps}
          onError={onError(props)}
          collections={this.state.collections || []}
          readOnly={!['reviewed', 'admin', 'confirmed'].includes(this.state.profile.status)}
        />
      );
    };
    const collection = (props) => {
      const profile = (this.state.collections || []).find((collection) => collection.id === props.match.params.uuid);
      return profile ? (
        <Collection
          {...props}
          {...commonProps}
          onError={onError(props)}
          readOnly={!['reviewed', 'admin', 'confirmed'].includes(this.state.profile.status)}
          profile={profile}
        />
      ) : null;
    };
    const newCollection = (props) => {
      return (<NewCollection
        {...props}
        {...commonProps}
        onError={onError(props)}
      />);
    };
    const confirmation = (props) => {
      return (<Status
        {...props}
        status={this.state.profile.status}
        {...commonProps}
        onError={onError(props)}
      />);
    };
    const password = (props) => {
      return (<Password
        {...props}
        {...commonProps}
        profile={this.state.profile || {}}
        onError={onError(props)}
      />);
    };
    this.routes = [
      {
        path: '/admin',
        render: admin
      },
      {
        path: '/profile',
        render: profile
      },
      {
        path: '/collections',
        render: collections
      },
      {
        path: '/collection/:uuid',
        render: collection,
      },
      {
        path: '/new/collection',
        render: newCollection,
      },
      {
        path: '/status',
        render: confirmation,
      },
      {
        path: '/change-password',
        render: password,
      },
    ];
    return (
      <Router history={browserHistory}>
        <div className="app">
          <nav>
            <img src={logo} className="app-logo" alt="logo" />
            <h2 className="app-intro">
              友拍
            </h2>
            {
              this.state.profile.status === null ?
                (<div>Loading...</div>):
                (
                  <div className="user-info">
                    <img src={this.state.profile.avatar.value.path} alt="avatar" />
                    <p className="user-name">
                      {this.state.profile.name.value}
                    </p>
                    <p className="likes">
                      点赞：{this.state.profile.likes.value}
                    </p>
                  </div>
                )
            }
          </nav>
          <div className="main">
            <div className="user-left">
              <div className="user-left-title">个人中心</div>
              {
                this.state.profile.status === 'admin' ?
                  (<ul>
                    {
                      [
                        {
                          to: '/admin',
                          name: '首页'
                        },
                        {
                          to: '/admin/profiles',
                          name: '账号'
                        },
                      ].map((link, index) => (
                        <li key={index}>
                          <NavLink to={link.to} activeClassName='active-link'>{link.name}</NavLink>
                        </li>
                      ))
                    }
                  </ul>):
                  (<ul>
                    {
                      [
                        {
                          to: '/profile',
                          name: '个人信息'
                        },
                        {
                          to: '/collections',
                          name: '图集'
                        },
                        {
                          to: '/change-password',
                          name: '更改密码'
                        },
                        {
                          to: '/status',
                          name: '账号审核'
                        },
                      ].map((link, index) => (
                        <li key={index}>
                          <NavLink to={link.to} activeClassName='active-link'>{link.name}</NavLink>
                        </li>
                      ))
                    }
                  </ul>)
              }
            </div>
            <div className="router">
              {
                this.routes.map((route, i) => (
                  <Route key={i} path={route.path} render={route.render}
                  />
                ))
              }
            </div>
            <div className="no-float" />
            {/*<Route path="/profile/:id" component={profileForm} />*/}
          </div>
          <Alert position='bottom' effect='scale' stack={{limit: 3}} />
        </div>
      </Router>
    );
  }
}

export default App;
