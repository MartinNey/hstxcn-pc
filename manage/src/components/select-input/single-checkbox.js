import React, { Component } from 'react';
import './single-checkbox.css';

class SingleCheckbox extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(id) {
    this.props.onValueUpdate({
      [this.props.inputName]: {
        readOnly: this.props.readOnly,
        value: id
      }
    });
  }

  render() {
    const inputs = this.props.values.map((value) => {
      return (
        <li
          key={value.id}
          onClick={(e) => this.handleClick(value.id)}
          className={'checkbox-' + (this.props.value.value === value.id)}>
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
SingleCheckbox.propTypes = {
  label: React.PropTypes.string,
  onValueUpdate: React.PropTypes.func,
  values: React.PropTypes.array,
  inputName: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
  value: React.PropTypes.any
};

export default SingleCheckbox;
