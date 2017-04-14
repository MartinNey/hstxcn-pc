import React, { Component } from 'react';
import Alert from 'react-s-alert';
import BaseForm from './form/base-form';
import FORM_CONFIG from './conf/profile-conf';
import './form/inputs.css';

class ProfileForm extends Component {
  render() {
    return (
      <div className="profile-form">
        <BaseForm
          formConfig={FORM_CONFIG}
          formValue={this.props.profile}
          auth={this.props.auth}
          options={this.props.options}
          request={{
            url: '/api/profile',
            method: 'patch',
            name: '修改',
            then: (res) => {
              Alert.info('修改成功！');
              this.props.onUpdate();
              //console.log(res);
            },
            error: (err) => {
              this.props.onError(err);
              //console.log(err)
            }
          }}
        />
      </div>
    );
  }
}
ProfileForm.propTypes = {
  auth: React.PropTypes.string,
  history: React.PropTypes.object,
  profile: React.PropTypes.object,
  options: React.PropTypes.object,
  onUpdate: React.PropTypes.func,
  onError: React.PropTypes.func
};

export default ProfileForm;
