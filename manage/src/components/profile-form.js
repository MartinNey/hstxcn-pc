import React, { Component } from 'react';
import BaseForm from './form/base-form';
import FORM_CONFIG from './conf/form-conf';
import './form/inputs.css';

class ProfileForm extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  render() {
    return (
      <div className="profile-form">
        <BaseForm
          formConfig={FORM_CONFIG}
          formValue={this.props.profile}
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
ProfileForm.propTypes = {
  profile: React.PropTypes.object
};

export default ProfileForm;
