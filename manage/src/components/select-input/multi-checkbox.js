import React, { Component } from 'react';
import './multi-checkbox.css';

class MultiCheckbox extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(id) {
    let value = this.props.value;
    const theIndex = value.indexOf(id);
    if (theIndex > -1) {
      value.splice(theIndex, 1);
    } else {
      value.push(id);
    }
    this.props.onValueUpdate({
      [this.props.inputName]: {
        readOnly: this.props.readOnly,
        value: value
      }
    });
  }
  render() {
    const inputs = this.props.values.map((value) => {
      return (
        <div
          key={value.id}
          onClick={(e) => this.handleClick(value.id)}
          className={'checkbox-' + (this.props.value.includes(value.id))}>
          {value.name}
        </div>
      );
    });
    return (
      <div className={'multi-checkbox '+this.props.inputName}>
        <p className='label'>{this.props.label}</p>
        {inputs}
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
