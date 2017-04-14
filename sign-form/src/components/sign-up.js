import React, { Component } from 'react';
import BaseForm from './base-form';
import './inputs.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    const isNotEmpty = (value) => !(value.length === 0 || !value.trim());
    this.formConfig = [
      {
        id: 0,
        inputName: 'name',
        label: '姓名',
        type: 'text',
        value: '',
        placeholder: '',
        validator: isNotEmpty,
        trans: (value) => value,
        error: '姓名格式不正确'

      },
      {
        id: 1,
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
        id: 2,
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
      <div className="sign-up">
        <BaseForm
          formConfig={this.formConfig}
          request={{
            url: '/api/register',
            name: '注册',
            method: 'post',
            then: (res) => {
              if (res.status === 201) {
                document.cookie = 'auth=' + res.data.auth + ', path=/manage';
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

export default SignUp;
