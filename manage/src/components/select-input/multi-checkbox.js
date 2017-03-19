import React, { Component } from 'react';
import './multi-checkbox.css';

class MultiCheckbox extends Component {
  render() {
    return (
      <div className={'multi-checkbox '+this.props.inputName}>
      </div>
    );
  }
}

export default MultiCheckbox;
