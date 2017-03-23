import React, { Component } from 'react';
// import axios from 'axios';
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
              //console.log(res);
            },
            error: (err) => {
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
  profile: React.PropTypes.object,
  options: React.PropTypes.object
};

export default ProfileForm;
