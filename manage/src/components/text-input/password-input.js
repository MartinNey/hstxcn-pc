import React, { Component } from 'react';
import BasicTextInput from './basic-text-input';

class PasswordInput extends Component {

  render() {
    const {...allProps} = this.props;
    return (
      <BasicTextInput
        type="password"
        {...allProps}
      />
    );
  }
}

export default PasswordInput;
