import React, { Component } from 'react';
import './single-checkbox.css';

class SingleCheckbox extends Component {
  constructor(props) {
    super(props);
    this.handleClickUpdate = this.handleClickUpdate.bind(this);
  }
  handleClickUpdate(value) {
    //TODO:check the validator and show it
    this.props.onValueUpdate({
      [this.props.inputName]: value
    });
  }

  render() {
    const inputs = this.props.values.map((value) => {
      return (
        <div
          key={value.label}
          value={value.value}
          onClick={(e) => this.handleClickUpdate(value.value)}
          className={'checkbox-' + (this.props.value === value.value)}>
          {value.label}
        </div>
      );
    });
    return (
      <div
        className={'single-checkbox '+this.props.inputName}
      >
        {inputs}
      </div>
    );
  }
}

export default SingleCheckbox;
