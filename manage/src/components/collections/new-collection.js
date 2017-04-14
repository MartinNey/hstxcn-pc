import React, { Component } from 'react';
import BaseForm from '../form/base-form';
import Alert from 'react-s-alert';
import FORM_CONFIG from '../conf/collections-conf';

class NewCollection extends Component {
  render() {
    const formValue = FORM_CONFIG.reduce((acc, config) => {
      acc[config.inputName] = {
        value: '',
        readOnly: false
      };
      acc[config.inputName].value = '';
      acc[config.inputName].readOnly = false;
      return acc;
    }, {});
    return (
      <div className="new-collection">
        <div className="new-collection-title">新建图集</div>
        <BaseForm
          formConfig={FORM_CONFIG}
          formValue={formValue}
          auth={this.props.auth}
          request={{
            url: `/api/user/collection`,
            method: 'post',
            name: '新建',
            then: (res) => {
              //console.log(res);
              Alert.info(`图集"${res.data.name}"新建成功`);
              this.props.history.push('/collections');
              this.props.onUpdate(res);
            },
            error: (err) => {
              this.props.onError(err);
            }
          }}
        />
      </div>
    );
  }
}
// TODO: images should be uploaded here,using image_uploader component, send collection_id as router argument
NewCollection.propTypes = {
  auth: React.PropTypes.string,
  onUpdate: React.PropTypes.func,
  history: React.PropTypes.object,
  onError: React.PropTypes.func,
};

export default NewCollection;
