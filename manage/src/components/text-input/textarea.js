import React, { Component } from 'react';
import BasicTextInput from './basic-text-input';

class Textarea extends Component {

  render() {
    return (
      <BasicTextInput
        type="textarea"
        {...this.props}
      />
    );
  }
}

export default Textarea;
