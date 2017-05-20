import React, { Component } from 'react';
import cookie from 'react-cookie';
import Axios from 'axios';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
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
import Admin from "./components/admin/admin";
import User from "./components/user/user";
import './App.css';
import logo from './logo.png';
import Theme from "./components/theme/theme";
import UserList from "./components/user/user-list";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: cookie.load('auth'),
      profile: {
        status: null,
      },
      users: [],
      collections: [],
      options: null
    };
    this.loadProfile = this.loadProfile.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    this.loadCollections = this.loadCollections.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
  }
  componentWillMount() {
    this.loadProfile();
    this.loadOptions();
    this.loadCollections();
  }
  loadUsers() {
    Axios({
      url: '/api/users',
      headers: {
        Authorization: this.state.auth,
      },
      method: 'get'
    }).then((res) => {
      this.setState({
        users: res.data
      });
    }).catch((err) => {
      console.error(err);
      Alert.error('获取用户信息失败，请检查网络连接');
    });
  }
  loadProfile() {
    Axios({
      url: '/api/profile',
      headers: {
        Authorization: this.state.auth,
      },
      method: 'get'
    }).then((res) => {
      const profile = App.profileParser(res.data);
      if (profile.status === 'admin') {
        this.loadUsers();
      }
      this.setState({
        profile: profile
      });
    }).catch((err) => {
      Alert.error('登录失败，即将跳转至登录页面');
      console.error(err);
      setTimeout(() => {
        // TODO: while debugging
        // window.location.href = '/login';
      }, 3000);
    });
  }
  static profileParser(rowData) {
    // as I just need to remove collection var from rowData
    /*eslint no-unused-vars: off*/
    const {id, status, avatar, collection, ...other} = rowData;
    const profile = {
      status: status || 'reviewed',
      avatar: avatar || {
        path: ''
      },
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
    Axios({
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
    Axios({
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
      if (this.state.profile.status === 'unconfirmed') {
        Alert.info('未验证邮箱不可操作图集');
      } else {
        Alert.error('获取图集失败，请检查网络连接');
      }
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
    const statusConfig = {
      admin: {
        name: '管理员',
        buttonText: '无操作',
        anotherText: '无操作',
        clickHandler: () => console.log('click~click~'),
        anotherHandler: () => console.log('click~click~')
      },
      unconfirmed: {
        name: '未验证邮箱',
        buttonText: '无操作',
        anotherText: '无操作',
        clickHandler: () => console.log('click~click~'),
        anotherHandler: () => console.log('click~click~')
      },
      confirmed: {
        name: '未提交审核',
        buttonText: '无操作',
        anotherText: '无操作',
        clickHandler: () => console.log('click~click~'),
        anotherHandler: () => console.log('click~click~')
      },
      reviewing: {
        name: '审核中',
        buttonText: '通过',
        anotherText: '拒绝',
        clickHandler: (user) => Axios({
          url: `/api/user/activate`,
          headers: {
            Authorization: this.state.auth,
          },
          data: {
            email: user.email
          },
          method: 'post'
        }).then(() => {
          Alert.success(`已通过用户'${user.name}'审核`);
          this.loadProfile();
          this.loadCollections();
        }).catch((err) => {
          Alert.error(`出错，${err}`);
        }),
        anotherHandler: (user) => Axios({
          url: `/api/user/activate`,
          headers: {
            Authorization: this.state.auth,
          },
          data: {
            email: user.email
          },
          method: 'delete'
        }).then(() => {
          Alert.success(`已拒绝用户'${user.name}'审核`);
          this.loadProfile();
          this.loadCollections();
        }).catch((err) => {
          Alert.error(`出错，${err}`);
        })
      },
      reviewed: {
        name: '已通过审核',
        buttonText: '取消审核',
        anotherText: '无操作',
        clickHandler: (user) => Axios({
          url: `/api/user/activate`,
          headers: {
            Authorization: this.state.auth,
          },
          data: {
            email: user.email
          },
          method: 'delete'
        }).then(() => {
          Alert.success(`已取消用户'${user.name}'审核资质`);
          this.loadProfile();
          this.loadCollections();
        }).catch((err) => {
          Alert.error(`出错，${err}`);
        }),
        anotherHandler: () => console.log('click~click~')
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
        return (<Admin
          {...props}
          {...commonProps}
          onError={onError(props)}
        />);
      }
    };
    const theme = (props) => {
      return (<Theme
        {...props}
        {...commonProps}
        onError={onError(props)}
      />);
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
          maxImages={20}
          description='作品图集，将展示在友拍属于您的摄影师主页中。每个图集最多可上传20张图片。'
          readOnly={!['reviewed', 'admin', 'confirmed'].includes(this.state.profile.status)}
          profile={profile}
        />
      ) : null;
    };
    const cover = (props) => {
      const cover = this.state.profile.cover;
      return cover ? (
        <Collection
          {...props}
          {...commonProps}
          onError={onError(props)}
          maxImages={8}
          description='封面图集，个人代表作品。将会在摄影师列表中，第一时间呈现给用户。最多可上传8张图片。'
          readOnly={!['reviewed', 'admin', 'confirmed'].includes(this.state.profile.status)}
          profile={cover.value}
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
        id={this.state.profile.id || ''}
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
    const users = (props) => {
      return (<UserList
        {...props}
        {...commonProps}
        users={this.state.users}
        statusConfig={statusConfig}
      />);
    };
    const user = (props) => {
      const user = (this.state.users || []).find((user) => user.id === props.match.params.uuid);
      return user ? (
        <User
          {...props}
          {...commonProps}
          user={user}
          options={this.state.options || {}}
          statusConfig={statusConfig}
        />
      ) : null;
    };
    this.routes = [
      {
        path: '/admin',
        render: admin
      },
      {
        path: '/users',
        render: users
      },
      {
        path: '/user/:uuid',
        render: user
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
        path: '/cover',
        render: cover,
      },
      {
        path: '/theme',
        render: theme,
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
      <Router history={browserHistory} basename="/manage">
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
                    <img src={this.state.profile.avatar.path} alt="avatar" />
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
                          to: '/users',
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
                          to: '/cover',
                          name: '封面'
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
