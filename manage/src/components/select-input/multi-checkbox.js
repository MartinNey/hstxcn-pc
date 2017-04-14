import React, { Component } from 'react';
import './multi-checkbox.css';

class MultiCheckbox extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.containValue = this.containValue.bind(this);
  }
  handleClick(value) {
    let propValue = this.props.value;
    const theIndex = this.props.value.findIndex((each) => each.id === value.id);
    if (theIndex > -1) {
      propValue.splice(theIndex, 1);
    } else {
      propValue.push(value);
    }
    this.props.onValueUpdate({
      [this.props.inputName]: {
        readOnly: this.props.readOnly,
        value: propValue
      }
    });
  }
  containValue(id) {
    const idList = this.props.value.map((value) => value.id);
    return idList.includes(id);
  }
  render() {
    const inputs = this.props.values.map((value) => {
      return (
        <li
          key={value.id}
          onClick={(e) => this.handleClick(value)}
          className={'checkbox-' + (this.containValue(value.id))}>
          {value.name}
        </li>
      );
    });
    return (
      <div className={'checkbox '+this.props.inputName}>
        <label>{this.props.label}</label>
        <ul>
          {inputs}
        </ul>
      </div>
    );
  }
}

MultiCheckbox.propTypes = {
  label: React.PropTypes.string,
  onValueUpdate: React.PropTypes.func,
  values: React.PropTypes.array,
  value: React.PropTypes.array,
  inputName: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
};

export default MultiCheckbox;
