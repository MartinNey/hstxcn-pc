import React, {Component} from 'react';

class Theme extends Component {
  render() {
    return (<div>{this.props.auth}</div>);
  }
}

Theme.propTypes = {
  auth: React.PropTypes.string,
};

export default Theme;

