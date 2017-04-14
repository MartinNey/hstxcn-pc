const FORM_CONFIG = [
  {
    id: 1,
    inputName: 'self_password',
    label: '旧密码',
    type: 'password',
    value: '',
    placeholder: '(必填项）',
    validator: (value) => /^([a-zA-Z0-9_@*#]{8,15})$/.test(value),
    trans: (value) => value,
    error: '名字可为空'
  },
  {
    id: 0,
    inputName: 'password',
    label: '新密码',
    type: 'password',
    value: '',
    placeholder: '(必填项）',
    validator: (value) => /^([a-zA-Z0-9_@*#]{8,15})$/.test(value),
    trans: (value) => value,
    error: '描述不可为空'
  },
];

export default FORM_CONFIG;
