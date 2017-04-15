import React, {Component} from 'react';
import Axios from 'axios';
import Alert from 'react-s-alert';
import './status.css';

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendCD: 0,
    };
    this.statusChinese = {
      unconfirmed: '未验证邮箱',
      confirmed: '未提交审核',
      reviewing: '审核中',
      reviewed: '审核通过',
      admin: '管理员'
    };
    this.statusInfo = {
      unconfirmed: (
        <div>
          <p>账户尚未验证邮箱，请前往您的个人邮箱确认</p>
          <button disabled={this.state.sendCD > 0} onClick={(e) => this.resendConfirmation()}>重新发送</button>
          {
            this.state.sendCD > 0 ? (<p className="send-cd">{this.state.sendCD}秒后可重新发送</p>) : null
          }
        </div>
      ),
      confirmed: (
        <div>
          <p>您的账户尚未通过审核，若要展示在平台上，请先提交并通过我们的人工审核，审核将在两到三个工作日之内完成。账户在审核过程中无法更改资料。</p>
          <button onClick={(e) => this.handleConfirm()}>提交审核</button>
        </div>
      ),
      reviewing: (
        <div>
          <p>账户正在审核中，请耐心等待</p>
        </div>
      ),
      reviewed: (
        <div>
          <p>审核已通过</p>
        </div>
      ),
      admin: (
        <div>
          <p>管理员</p>
        </div>
      )
    };
  }
  handleConfirm() {
    Axios({
      method: 'put',
      headers: {
        Authorization: this.props.auth,
      },
      url: '/api/profile'
    }).then((res) => {
      Alert.success('审核已提交，请耐性等待结果');
      this.props.onUpdate();
    }).catch((err) => {
      this.props.onError(err);
    });
  }
  resendConfirmation() {
    Axios({
      method: 'post',
      headers: {
        Authorization: this.props.auth,
      },
      url: `/user/${this.props.id}/confirmation`
    }).then((res) => {
      Alert.success('邮件以发送，请注意查收');
      this.props.onUpdate();
    }).catch((err) => {
      this.props.onError(err);
    });
  }

  render() {
    return (
      <div className="status">
        <p className="status-title">
          目前状态：{this.statusChinese[this.props.status]}
        </p>
        <div className="status-info">
          {this.statusInfo[this.props.status]}
        </div>
      </div>
    );
  }
}

Status.propTypes = {
  id: React.PropTypes.string,
  status: React.PropTypes.oneOf([
    'unconfirmed',
    'confirmed',
    'reviewing',
    'reviewed',
    'admin'
  ]),
  auth: React.PropTypes.string,
  history: React.PropTypes.object,
  onUpdate: React.PropTypes.func,
  onError: React.PropTypes.func,
  readOnly: React.PropTypes.bool
};

export default Status;
