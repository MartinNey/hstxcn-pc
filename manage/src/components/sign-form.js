import React, { Component } from 'react';
import BaseForm from './base-form';
import './inputs.css';

class SignForm extends Component {
  constructor(props) {
    super(props);
    const isNotEmpty = (value) => !(value.length === 0 || !value.trim());
    this.formConfig = [
      {
        id: 0,
        inputName: 'phone_number',
        label: '手机',
        type: 'text',
        value: '',
        placeholder: '1xxxxxxxxxx',
        validator: (value) => /^1[0-9]{10}$/.test(value),
        trans: (value) => value,
        error: '格式不正确'
      },
      {
        id: 1,
        inputName: 'email',
        label: '邮箱',
        type: 'text',
        value: '',
        placeholder: 'youpai@hustunique.com',
        validator: (value) => /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(value),
        trans: (value) => value,
        error: '格式不正确'
      },
      {
        id: 2,
        inputName: 'name',
        label: '姓名',
        type: 'text',
        value: '',
        placeholder: '友拍',
        validator: isNotEmpty,
        trans: (value) => value,
        error: '不可为空'
      },
      {
        id: 3,
        inputName: 'description',
        label: '简介',
        type: 'text',
        value: '',
        placeholder: '',
        validator: isNotEmpty,
        trans: (value) => value,
        error: '不可为空'
      },
      {
        id: 4,
        inputName: 'major',
        label: '专业',
        type: 'text',
        value: '',
        placeholder: '软件工程',
        validator: isNotEmpty,
        trans: (value) => value,
        error: '不可为空'
      },
      {
        id: 5,
        inputName: 'imagelink',
        label: '图集',
        type: 'text',
        value: '',
        placeholder: 'http://www.hustunique.com',
        validator: isNotEmpty,
        trans: (value) => value,
        error: '不可为空'
      },
      {
        id: 6,
        inputName: 'tag',
        label: '标签',
        type: 'text',
        value: '',
        placeholder: '好人/超级好人/约拍500',
        validator: (value) => value.split('/').reduce((acc, val) => {
          return acc && isNotEmpty(val);
        }, true),
        trans: (value) => value.split('/'),
        error: '格式不正确'
      },
      {
        id: 7,
        inputName: 'sex',
        label: '性别',
        type: 'single-checkbox',
        value: '1',
        placeholder: '',
        values: [
          {
            label: '男',
            value: '1'
          },
          {
            label: '女',
            value: '0'
          }
        ],
        validator: (value) => true,
        trans: (value) => value
      },
      {
        id: 8,
        inputName: 'styles',
        label: '风格',
        type: 'multi-checkbox',
        value: [],
        placeholder: '',
        values: [
          //TODO: use /api/blablabla/option to get info
          {
            label: '测试',
            value: 'uuid'
          },
          {
            label: '又一个测试',
            value: 'uuid222'
          }
        ],
        // validator: (value) => value.length > 0,
        validator: (value) => true,
        trans: (value) => value,
        error: '至少选择一项'
      },
      {
        id: 9,
        inputName: 'categories',
        label: '类目',
        type: 'multi-checkbox',
        value: [],
        placeholder: '',
        values: [
          //TODO: use /api/blablabla/option to get info
          {
            label: '测试',
            value: 'uuid'
          },
          {
            label: '又一个测试',
            value: 'uuid222'
          }
        ],
        // validator: (value) => value.length > 0,
        validator: (value) => true,
        trans: (value) => value,
        error: '至少选择一项'
      },
      {
        id: 10,
        inputName: 'images',
        label: '作品',
        type: 'image-input',
        value: [],
        placeholder: '',
        validator: (value) => value.length > 0,
        trans: (value) => value,
        error: '不可为空'
      },
    ];
  }
  render() {
    return (
      <div className="sign-form">
        <BaseForm
          formConfig={this.formConfig}
          request={{
            url: '/api/profile',
            method: 'patch',
            name: '修改',
            then: (res) => console.log(res),
            error: (err) => console.log(err)
          }}
        />
      </div>
    );
  }
}

export default SignForm;
