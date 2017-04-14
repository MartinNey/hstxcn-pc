import React, { Component } from 'react';
import CollectionInfo from './collection-info';
import RectImage from './rect-image';
import Alert from 'react-s-alert';
import ReactModal from 'react-modal';
import Axios from 'axios';
import ImageUploader from './image-uploader';
// import { Link } from 'react-router-dom';

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.onDelete = this.onDelete.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  onDelete(id) {
    Axios({
      url: `/api/user/collection/${this.props.profile.id}/works/${id}`,
      headers: {
        Authorization: this.props.auth,
      },
      method: 'delete'
    }).then((res) => {
      Alert.success(`删除一张图片`);
      this.props.onUpdate();
    }).catch((err) => {
      this.props.onError(err);
    });
  }
  render() {
    return (
      <div className="collection">
        <CollectionInfo
          {...this.props}
        />
        <div className="collection-images">
          <p className="collection-images-title">图集图片</p>
          {this.props.profile.images.map((image, index) =>
            <div
              key={index}
              className="image-wrap">
              <RectImage
                url={image.compressed_path}
                detail={image.path}
                onRemove={() => this.onDelete(image.id)}
              />
            </div>
          )}
          <div className="image-wrap with-dashed">
            <div className="image-upload" onClick={this.handleOpenModal}>
              <p>上传图片</p>
            </div>
          </div>
          <div className="no-float" />
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          contentLabel="Upload Image"
        >
          <ImageUploader
            onUpdate={this.props.onUpdate}
            uuid={this.props.profile.id}
            history={this.props.history}
            auth={this.props.auth}
          />
        </ReactModal>
      </div>
    );
  }
}
Collection.propTypes = {
  profile: React.PropTypes.object,
  auth: React.PropTypes.string,
  history: React.PropTypes.object,
  onUpdate: React.PropTypes.func,
  onError: React.PropTypes.func,
  readOnly: React.PropTypes.bool
};

export default Collection;
