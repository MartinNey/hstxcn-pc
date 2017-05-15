import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import Axios from 'axios';
// import Alert from 'react-s-alert';
// import RectImage from "../collections/rect-image";

import './users.css';

class Users extends Component {

  render() {
    const usersEle = this.props.users.map((user, index) => {
      return (
        <li key={index}>
          <Link to={`/user/${user.id}`}>
            <div className="user-list-par user-list-name">{user.name}</div>
            <div className="user-list-par user-list-description">{user.description || '<无描述>'}</div>
            <div className="user-list-par user-list-status">{this.props.statusConfig[user.status].name}</div>
          </Link>
          <div
            onClick={() => this.props.statusConfig[user.status].clickHandler(user)}
            className="user-list-par user-list-button"
          >
            {this.props.statusConfig[user.status].buttonText}
          </div>
          <div
            onClick={() => this.props.statusConfig[user.status].anotherHandler(user)}
            className="user-list-par user-list-button"
          >
            {this.props.statusConfig[user.status].anotherText}
          </div>
        </li>
      );
    });
    return (
      <ul
        className="user-list"
      >
        {usersEle}
      </ul>);
  }
}

Users.propTypes = {
  auth: React.PropTypes.string,
  users: React.PropTypes.array,
  history: React.PropTypes.object,
  statusConfig: React.PropTypes.object
};

export default Users;
