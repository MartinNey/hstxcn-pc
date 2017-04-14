import React, {Component} from 'react';
import Alert from 'react-s-alert';
import BaseForm from '../form/base-form';
import FORM_CONFIG from '../conf/password-conf';
import './password.css';

class Password extends Component {
  render() {
    const formValue = FORM_CONFIG.reduce((acc, config) => {
      acc[config.inputName] = {
        value: '',
        readOnly: false
      };
      acc[config.inputName].value = this.props.profile[config.inputName] || '';
      acc[config.inputName].readOnly = this.props.readOnly;
      return acc;
    }, {});
    return (
      <div className="change-password">
        <p className="password-title">修改密码</p>
        <BaseForm
          formConfig={FORM_CONFIG}
          formValue={formValue}
          auth={this.props.auth}
          request={{
            url: `/api/profile`,
            method: 'patch',
            name: '修改',
            then: (res) => {
              Alert.success('修改成功');
              this.props.onUpdate();
            },
            error: (err) => {
              this.props.onError(err);
            }
          }}
        />
        {/*<button onClick={(e) =>{*/}
        {/*this.onDelete();*/}
        {/*}}>删除</button>*/}
      </div>
    );
  }
}

Password.propTypes = {
  auth: React.PropTypes.string,
  history: React.PropTypes.object,
  onUpdate: React.PropTypes.func,
  onError: React.PropTypes.func,
  readOnly: React.PropTypes.bool
};

export default Password;
