const isNotEmpty = (value) => !(value instanceof (String) && (value.length === 0 || !value.trim()));
const FORM_CONFIG = [
  // {
  //   id: 0,
  //   inputName: 'phone_number',
  //   label: '手机',
  //   type: 'text',
  //   value: this.props.profile,
  //   placeholder: '1xxxxxxxxxx',
  //   validator: (value) => /^1[0-9]{10}$/.test(value),
  //   trans: (value) => value,
  //   readOnly: false,
  //   error: '格式不正确'
  // },
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
    id: 0,
    inputName: 'likes',
    label: '点赞',
    type: 'text',
    value: '',
    validator: (value) => true,
    trans: (value) => value,
    error: '23333'
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
    inputName: 'tags',
    label: '标签',
    type: 'tag',
    value: [],
    placeholder: '新标签',
    validator: (value) => {console.log(value); return true},
    trans: (value) => value,
    error: '格式不正确'
  },
  {
    id: 10,
    inputName: 'schools',
    label: '学校',
    type: 'single-checkbox',
    value: null,
    values: [],
    placeholder: '',
    validator: (value) => true,
    trans: (value) => value,
    error: '选择一项学校'
  },
  {
    id: 7,
    inputName: 'sex',
    label: '性别',
    type: 'single-checkbox',
    value: true,
    placeholder: '',
    values: [
      {
        name: '男',
        id: true
      },
      {
        name: '女',
        id: false
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
    values: [],
    placeholder: '',
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
    values: [],
    placeholder: '',
    validator: (value) => true,
    trans: (value) => value,
    error: '至少选择一项'
  },
];

export default FORM_CONFIG;
