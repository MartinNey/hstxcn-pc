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
      [this.props.inputName]: {
        readOnly: this.props.readOnly,
        value: value
      }
    });
  }
  makeClassName() {
    return 'text-input'
      + (this.props.validator(this.props.value) ? ' valid' : ' invalid')
      + (this.state.touched ? ' touched' : ' untouched')
      + (this.state.isFocused ? ' focused' : '');
  }
  render() {
    const {...props} = {
      placeholder: this.props.placeholder,
      value: this.props.value,
      readOnly: this.props.readOnly,
      className: this.props.readOnly ? 'readonly' : 'not-readonly',
      onFocus: () => {
        this.setState({
          touched: true,
          isFocused: true
        });
      },
      onBlur: () => {
        this.setState({
          isFocused: false
        });
      },
      onChange: (e) => this.handleChange(e.target.value),
      name: this.props.inputName,
    };
    return (
      <div className={this.makeClassName()}>
        <label htmlFor={this.props.inputName}>
          {this.props.label}
        </label>
        {
          this.props.type === 'textarea'
            ? <textarea {...props} />
            : <input {...props} type={this.props.type} />
        }
        <span className="text-input-highlight" />
        <span className="text-input-bar" />
      </div>
    );
  }
}

BasicTextInput.propTypes = {
  type: React.PropTypes.string,
  input: React.PropTypes.string,
  inputName: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number]),
  label: React.PropTypes.string,
  validator: React.PropTypes.func,
  onValueUpdate: React.PropTypes.func,
};

export default BasicTextInput;
