import React, { Component } from 'react';

class BasicTextInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      touched: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.makeClassName = this.makeClassName.bind(this);
  }

  handleChange(value) {
    this.props.onValueUpdate({
      [this.props.inputName]: value
    });
  }
  makeClassName() {
    return 'text-input'
    + (this.props.validator(this.props.value) ? ' valid' : ' invalid')
    + (this.state.touched ? ' touched' : ' untouched')
    + (this.state.isFocused ? ' focused' : '');
  }
  render() {
    return (
      <div className={this.makeClassName()}>
        <label htmlFor={this.props.inputName}>
          {this.props.label}
        </label>
          <input type={this.props.type}
                 placeholder={this.props.placeholder}
                 defaultValue={this.props.value}
                 onFocus={() => {
                   this.setState({
                     touched: true,
                     isFocused: true
                   });
                 }}
                 onBlur={() => {
                   this.setState({
                     isFocused: false
                   })
                 }}
                 onChange={(e) => this.handleChange(e.target.value)}
                 name={this.props.inputName}
          />
      </div>
    );
  }
}

export default BasicTextInput;
