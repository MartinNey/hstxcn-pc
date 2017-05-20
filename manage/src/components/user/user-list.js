import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './users.css';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'number',
      reverse: false
    };
    const makeSortMethod = (prop) => (a, b) => a[prop] > b[prop] ? 1 : -1;
    this.sortMethod = ['number', 'name', 'description', 'status'].reduce((acc, value) => {
      acc[value] = makeSortMethod(value);
      return acc;
    }, {});
  }
  render() {
    let users = this.props.users.sort(this.sortMethod[this.state.sortBy]);
    if (this.state.reverse) {
      users.reverse();
    }
    const usersEle = users.map((user, index) => {
      return (
        <li key={index}>
          <Link to={`/user/${user.id}`}>
            <div className="user-list-par user-list-number">{`${user.number}`}</div>
            <div className="user-list-par user-list-name">{`${user.name}`}</div>
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
      <ul className="user-list" >
        <li>
          <div className="user-list-title">
            {
              [
                {
                  className: 'number',
                  text: '编号'
                },
                {
                  className: 'name',
                  text: '姓名'
                },
                {
                  className: 'description',
                  text: '描述'
                },
                {
                  className: 'status',
                  text: '状态'
                },
              ].map((title, index) => {
                const sortBy = this.state.sortBy === title.className;
                const sortClassName = sortBy ?
                  (this.state.reverse ? 'sort-by' : 'sort-by-reverse') : '';

                const className = `user-list-par user-list-${title.className} ${sortClassName}`;
                const handleClick = () => {
                  if (sortBy) {
                    const reverse = !this.state.reverse;
                    this.setState({
                      reverse: reverse
                    });
                  } else {
                    this.setState({
                      sortBy: title.className,
                      reverse: false
                    });
                  }
                };
                return (
                  <div
                    key={index}
                    onClick={handleClick}
                    className={className}
                  >{title.text}</div>
                );
              })
            }
          </div>
        </li>
        {usersEle}
      </ul>
    );
  }
}

UserList.propTypes = {
  users: React.PropTypes.array,
  statusConfig: React.PropTypes.object
};

export default UserList;
