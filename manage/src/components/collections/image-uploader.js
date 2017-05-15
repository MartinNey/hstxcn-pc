import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Alert from 'react-s-alert';
import axios from 'axios';

import RectImage from './rect-image';

// TODO: will receive collection id as argument in url
class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false
    };

    this.onDrop = this.onDrop.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.putIdInCollection = this.putIdInCollection.bind(this);
    this.uploadFinished = this.uploadFinished.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.dropzone = null;
  }
  uploadImage(file, index) {
    const data = new FormData();
    data.append('image', file);
    return axios({
      url: '/api/image',
      headers: {
        Authorization: this.props.auth,
      },
      data,
      method: 'post'
    }).then((res) => {
      this.putIdInCollection(file, res.data.id);
    }).catch((err) => {
      this.putIdInCollection(file, '');
    });
  }
  onDrop(acceptedFiles) {
    const fileList = this.state.files.concat(acceptedFiles);
    this.setState({
      files: fileList
    });
  }
  onOpenClick() {
    this.dropzone.open();
  }
  removeFile(file) {
    const fileList = this.state.files.reduce((newFileList, singleFile) => {
      if (file === singleFile) {
        return newFileList;
      } else {
        newFileList.push(singleFile);
        return newFileList;
      }
    }, []);
    this.setState({
      files: fileList
    });
  }
  putIdInCollection(file, id) {
    if (id === '') {
      this.counts++;
      if (this.counts === this.total) {
        this.finishAll(this.counts);
      }
    }
    axios({
      url: `/api/user/collection/${this.props.uuid}/works`,
      headers: {
        Authorization: this.props.auth,
      },
      data: {
        work: id
      },
      method: 'post'
    }).then((res) => {
      this.counts++;
      this.removeFile(file);
      if (this.counts === this.total) {
        this.finishAll(this.counts);
      }
    }).catch((err) => {
      this.counts++;
      if (this.counts === this.total) {
        this.finishAll(this.counts);
      }
    });
  }
  finishAll(counts) {
    const length = this.state.files.length;
    if (length > 0) {
      Alert.error(`${counts}张图片上传成功，${length}张图片上传失败`);
    } else {
      Alert.success(`${counts}张图片上传成功`);
    }
    this.setState({
      uploading: false
    });
    this.props.onUpdate();
  }
  uploadFinished(id, index) {
    this.ids[index] = id;
    if (this.ids.length === this.state.files.length) {
      this.putIdInCollection(this.ids);
    }
  }
  onSubmit() {
    const maxImages = this.props.maxImages === null ? 30 : this.props.maxImages;
    if (maxImages < this.state.files.length) {
      Alert.error('图片数目已超过限制，请减少部分图片！');
      return;
    }
    this.total = this.state.files.length;
    this.counts = 0;
    this.setState({
      uploading: true
    });
    this.state.files.forEach((file, index) => {
      this.uploadImage(file, index);
    });
  }
  render() {
    return (
      <div>
        <p className="collection-upload-title">上传图片</p>
        {
          this.props.description
            ? <p className="collection-upload-description">{this.props.description}</p>
            : null
        }
        <p className="collection-upload-image-max">还可上传图片数：{this.props.maxImages !== null
          ? this.props.maxImages
          : '无限制'}</p>
        {this.state.files.map((file, index) =>
          <div key={index}
               className="image-wrap">
            <RectImage
              url={file.preview}
              detail={file.preview}
              name={file.name}
              onRemove={() => this.removeFile(file)}
            />
          </div>
        )}
        <div className="image-wrap with-dashed">
          <Dropzone className="dropzone" ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
            <p>可拖拽图片至此</p>
          </Dropzone>
        </div>
        <div className="no-float" />
        <button
          className={'image-upload-button '+ (this.state.uploading ? 'uploading-button' : '')}
          disabled={this.state.uploading || (this.state.files.length === 0)}
          onClick={this.onSubmit}>
          {
              this.state.uploading ?
                <p>正在上传...</p> :
                <p>{this.state.files.length > 0 ? `上传${this.state.files.length}张图片` : '无图片'}</p>
          }
        </button>
      </div>
    );
  }
}
ImageUploader.propTypes = {
  auth: React.PropTypes.string,
  description: React.PropTypes.string,
  maxImages: React.PropTypes.number,
  onUpdate: React.PropTypes.func,
  history: React.PropTypes.object,
  uuid: React.PropTypes.string
};

export default ImageUploader;