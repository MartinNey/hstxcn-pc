import React, { Component } from 'react';

class Admin extends Component {
  render() {
    return (<div>{this.props.auth}</div>);
  }
};

Admin.propTypes = {
  auth: React.PropTypes.string,
};

export default Admin;