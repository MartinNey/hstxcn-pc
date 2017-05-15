const isNotEmpty = (value) => (typeof value === 'string') && !(value.length === 0 || !value.trim());

const FORM_CONFIG = [
  {
    id: 1,
    inputName: 'name',
    label: '名字',
    type: 'text',
    value: '',
    placeholder: '(必填项）',
    validator: isNotEmpty,
    trans: (value) => value,
    error: '名字可为空'
  },
  {
    id: 0,
    inputName: 'description',
    label: '描述',
    type: 'text',
    value: '',
    placeholder: '(选填）',
    validator: value => true,
    trans: (value) => value,
    error: '描述不可为空'
  },
  {
    id: 2,
    inputName: 'model_name',
    label: '模特',
    type: 'text',
    value: '',
    placeholder: '(选填）',
    validator: value => true,
    trans: (value) => value,
    error: '模特名不可为空'
  },
  {
    id: 3,
    inputName: 'photoshop',
    label: '后期',
    type: 'text',
    value: '',
    placeholder: '(选填）',
    validator: value => true,
    trans: (value) => value,
    error: '后期内容不可为空'
  },
  {
    id: 4,
    inputName: 'filming_time',
    label: '摄影时间',
    type: 'text',
    value: '',
    placeholder: '(选填）',
    validator: value => true,
    trans: (value) => value,
    error: '摄影时间不可为空'
  }
];

export default FORM_CONFIG;
