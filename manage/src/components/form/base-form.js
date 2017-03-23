import React, { Component } from 'react';
import axios from 'axios';
import TextInput from '../text-input/text-input';
import PasswordInput from '../text-input/password-input';
import SingleCheckbox from '../select-input/single-checkbox';
import MultiCheckbox from '../select-input/multi-checkbox';
import ImageInput from '../collections/image-input';
import Tag from '../tags/tag';
import './inputs.css';

class BaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.formConfig.reduce((acc, val) => {
      acc[val.inputName] = this.props.formValue[val.inputName] || {
        value: val.value,
        readOnly: false,
      };
      return acc;
    }, {
      msg: {
        // ok/error/processing
        type: 'ok',
        content: ''
      }
    });

    this.trySubmit = this.trySubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.transToForm = this.transToForm.bind(this);
  }
  transToForm() {
    return this.props.formConfig.reduce((acc, val) => {
      if (!this.state[val.inputName].readOnly) {
        acc[val.inputName] = val.trans(this.state[val.inputName].value);
      }
      return acc;
    }, {});
  }
  trySubmit() {
    this.setState({
      msg: {
        type: 'processing',
        content: 'submitting...'
      }
    });

    axios({
      method: this.props.request['method'],
      url: this.props.request['url'],
      headers: {'Authorization': this.props.auth},
      data: this.transToForm()
    }).then((res) => {
      this.props.request['then'](res);
      this.setState({
        msg: {
          type: 'ok',
          content: 'success'
        }
      });
    }).catch((err) => {
      this.props.request['error'](err);

      const data = err.response ? err.response.data : [{'error': 'unknown error'}];
      const msg = data[0]['error'] || '';
      this.setState({
        msg: {
          content: msg
        }
      });
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const status = this.props.formConfig.reduce((acc, val) => {
      const result = val.validator(this.state[val.inputName].value);
      if (!result) {
        acc.valid = false;
        acc.msg = val.error;
      }
      return acc;
    }, {
      valid: true,
      msg: ''
    });
    if (!status.valid) {
      this.setState({
        msg: {
          type: 'error',
          content: status.msg
        }
      });
    } else {
      this.trySubmit();
    }
  }
  handleFormChange(state) {
    this.setState(state);
  }
  render() {
    let formList = this.props.formConfig.map((form) => {
      /* eslint no-unused-vars: "off" */
      const {id, values, ...props} = form;
      switch (form.type) {
      case 'text':
        return (
          <TextInput
            {...props}
            key={form.id}
            value={this.state[form.inputName].value}
            readOnly={this.state[form.inputName].readOnly}
            onValueUpdate={this.handleFormChange}
          />);
      case 'password':
        return (
          <PasswordInput
            {...props}
            key={form.id}
            value={this.state[form.inputName].value}
            readOnly={this.state[form.inputName].readOnly}
            onValueUpdate={this.handleFormChange}
          />);
      case 'single-checkbox':
        return (
          <SingleCheckbox
            {...props}
            key={form.id}
            value={this.state[form.inputName].value}
            values={this.props.options[form.inputName] || values}
            readOnly={this.state[form.inputName].readOnly}
            onValueUpdate={this.handleFormChange}
          />);
      case 'multi-checkbox':
        return (
          <MultiCheckbox
            {...props}
            key={form.id}
            value={this.state[form.inputName].value}
            values={this.props.options[form.inputName] || values}
            readOnly={this.state[form.inputName].readOnly}
            onValueUpdate={this.handleFormChange}
          />);
      case 'tag':
        return (
          <Tag
            {...props}
            key={form.id}
            value={this.state[form.inputName].value}
            readOnly={this.state[form.inputName].readOnly}
            onValueUpdate={this.handleFormChange}
          />);
      case 'image-input':
        return (
          <ImageInput
            {...props}
            key={form.id}
            value={this.state[form.inputName].value}
            readOnly={this.state[form.inputName].readOnly}
            onValueUpdate={this.handleFormChange}
          />);
      default:
        return (
          <div
            key={form.id}
          >Unexpected type</div>
        );
      }
    });
    return (
      <form className='base-form' onSubmit={this.handleSubmit}>
        <div className='input-group'>
          {formList}
        </div>
        <div className={'base-form-message ' + this.state.msg.type}>
          {this.state.msg.content}
        </div>
        <input
          className="submit"
          type="submit"
          value={this.props.request.name} />
      </form>
    );
  }
}
BaseForm.propTypes = {
  formConfig: React.PropTypes.array,
  formValue: React.PropTypes.object,
  request: React.PropTypes.object,
  options: React.PropTypes.object,
  auth: React.PropTypes.string
};

export default BaseForm;
