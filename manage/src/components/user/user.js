import React, { Component } from 'react';
import RectImage from '../collections/rect-image';
import BaseForm from '../form/base-form';
import FORM_CONFIG from '../conf/profile-conf';

class User extends Component {
  render() {
    const user = this.props.user;
    return (<div className="user-detail">
      <div
        onClick={() => this.props.statusConfig[user.status].clickHandler(user)}
        className="user-list-par user-list-button"
      >
        {this.props.statusConfig[user.status].buttonText}
      </div>
      <p className="user-detail-name">姓名：{user.name}</p>
      <p className="user-detail-description">描述：{user.description}</p>
      <p className="user-detail-sex">性别：{user.sex ? '男': '女'}</p>
      <p className="user-detail-major">专业：{user.major}</p>
      <p className="user-detail-imagelink">图集链接：{user.imagelink}</p>
      <p className="user-detail-likes">点赞：{user.likes}</p>
      <div className="user-detail-tags">标签：{
        user.tags.map((tag, index) => (<p key={index} className="user-detail-tag">{tag.text}</p>))
      }</div>
      <div className="user-detail-categories">类目：{
        user.categories.map((single, index) => (<p key={index} className="user-detail-single">{single}</p>))
      }
      </div>
      <div className="user-detail-collections">图集：
        {user.collections.map((collection, index) => {
          const allImages = collection.images.map((image, index) =>
            <div
              key={index}
              className="image-wrap">
              <RectImage
                url={image.compressed_path}
                detail={image.path}
                onRemove={() => this.onDelete(image.id)}
              />
            </div>
          );
          return (
            <div key={index} className="user-detail-collection">
              <p className="user-detail-collection-name">{collection.name}</p>
              <p className="user-detail-collection-description">{collection.description}</p>
              <div className="user-detail-collection-images">
                {allImages}
                <div className="no-float" />
              </div>
            </div>
          );
        })}
      </div>
    </div>);
  }
}

User.propTypes = {
  options: React.PropTypes.object,
  auth: React.PropTypes.string,
  user: React.PropTypes.object,
  statusConfig: React.PropTypes.object
};

export default User;
