import React, { Component } from 'react';
import BasicTextInput from './basic-text-input';

class TextInput extends Component {

  render() {
    return (
      <BasicTextInput
        type="text"
        {...this.props}
      />
    );
  }
}

export default TextInput;
