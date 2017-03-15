import React, { Component } from 'react';
import axios from 'axios';
import TextInput from './text-input';
import PasswordInput from './password-input';
import SingleCheckbox from './single-checkbox';
import MultiCheckbox from './multi-checkbox';
import ImageInput from './image-input';
import './inputs.css';

class BaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.formConfig.reduce((acc, val) => {
      acc[val.inputName] = val.value;
      return acc;
    }, {
      msg: {
        // 0 - ok
        // 1 - error
        // 2 - processing
        type: 'ok',
        content: ''
      }});
    this.trySubmit = this.trySubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.transToForm = this.transToForm.bind(this);
  }
  transToForm() {
    return this.props.formConfig.reduce((acc, val) => {
      acc[val.inputName] = val.trans(this.state[val.inputName]);
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
      data: this.transToForm()
    }).then((res) => {
      //little hack
      this.props.request['then'](res);
      // let date = new Date();
      // date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
      // document.cookie = 'auth=' + res.data['auth'] + '; expires=' + date.toUTCString();

      this.setState({
        msg: {
          type: 'ok',
          content: 'success'
        }
      });
    }).catch((err) => {
      this.props.request['error'](err);

      let msg;
      try {
        msg = err.response.data[0]['error'];
      } catch (e) {
        msg = 'network error';
      }
      if (msg === undefined) {
        msg = 'unknown error';
      }
      this.setState({
        msg: {
          type: 'error',
          content: msg
        }
      });
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const status = this.props.formConfig.reduce((acc, val) => {
      const result = val.validator(this.state[val.inputName]);
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
      return;
    }
    this.trySubmit();
  }
  handleFormChange(state) {
    this.setState(state);
  }
  render() {
    let formList = this.props.formConfig.map((form) => {
      /* eslint no-unused-vars: "off" */
      const {id, ...props} = form;
      switch (form.type) {
        case 'text':
          return (
            <TextInput
              {...props}
              key={form.id}
              value={this.state[form.inputName]}
              onValueUpdate={this.handleFormChange}
            />);
        case 'password':
          return (
            <PasswordInput
              {...props}
              key={form.id}
              value={this.state[form.inputName]}
              onValueUpdate={this.handleFormChange}
            />);
        case 'single-checkbox':
          return (
            <SingleCheckbox
              {...props}
              key={form.id}
              value={this.state[form.inputName]}
              onValueUpdate={this.handleFormChange}
            />);
        case 'multi-checkbox':
          return (
            <MultiCheckbox
              {...props}
              key={form.id}
              value={this.state[form.inputName]}
              onValueUpdate={this.handleFormChange}
            />);
        case 'image-input':
          return (
            <ImageInput
              {...props}
              key={form.id}
              value={this.state[form.inputName]}
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

export default BaseForm;
