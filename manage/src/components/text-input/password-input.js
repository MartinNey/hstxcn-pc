import React, { Component } from 'react';
import BasicTextInput from './basic-text-input';

class PasswordInput extends Component {

  render() {
    return (
      <BasicTextInput
        type="password"
        {...this.props}
      />
    );
  }
}

export default PasswordInput;
