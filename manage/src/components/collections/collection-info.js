import React, {Component} from 'react';
import Alert from 'react-s-alert';
import BaseForm from '../form/base-form';
import FORM_CONFIG from '../conf/collections-conf';

class CollectionInfo extends Component {
  // constructor(props) {
  //   super(props);
    // this.onDelete = this.onDelete.bind(this);
  // }
  // onDelete() {
  //   Axios({
  //     url: `/api/user/collection/${this.props.profile.id}`,
  //     method: 'delete',
  //     headers: {'Authorization': this.props.auth},
  //   }).then((res) => {
  //     Alert.info('成功删除');
  //     this.props.history.push('/collections');
  //     this.props.onUpdate();
  //   }).catch((err) => {
  //     Alert.error(err.message);
  //   });
  // }
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
      <div className="collection-info">
        <p className="collection-info-title">图集信息</p>
        <BaseForm
          formConfig={FORM_CONFIG}
          formValue={formValue}
          auth={this.props.auth}
          request={{
            url: `/api/user/collection/${this.props.profile.id}`,
            method: 'patch',
            name: '保存',
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

CollectionInfo.propTypes = {
  profile: React.PropTypes.object,
  auth: React.PropTypes.string,
  history: React.PropTypes.object,
  onUpdate: React.PropTypes.func,
  onError: React.PropTypes.func,
  readOnly: React.PropTypes.bool
};

export default CollectionInfo;
