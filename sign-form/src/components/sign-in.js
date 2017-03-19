import React, { Component } from 'react';
import BaseForm from './base-form';
import './inputs.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.formConfig = [
      {
        id: 0,
        inputName: 'email',
        label: '邮箱',
        type: 'text',
        value: '',
        placeholder: '',
        validator: (value) => /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(value),
        trans: (value) => value,
        error: '邮箱格式不正确'
      },
      {
        id: 1,
        inputName: 'password',
        label: '密码',
        type: 'password',
        value: '',
        placeholder: '',
        validator: (value) => /^([a-zA-Z0-9_@*#]{8,15})$/.test(value),
        trans: (value) => value,
        error: '密码格式不正确'
      },
    ];
  }
  render() {
    return (
      <div className="sign-in">
        <BaseForm
          formConfig={this.formConfig}
          request={{
            url: '/api/login',
            method: 'post',
            name: '登录',
            then: (res) => {
              if (res.status === 200) {
                document.cookie = 'auth=' + res.data.auth;
                window.location.href = '/manage';
              }
            },
            error: (err) => console.log(err)
          }}
        />
      </div>
    );
  }
}

export default SignIn;
