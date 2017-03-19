import React, { Component } from 'react';
import ImagePreview from './image-preview'
import './image-input.css';

class ImageInput extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.renderImagePreview = this.renderImagePreview.bind(this);
  }

  handleUpdate(filelist) {
    //TODO:I don't know how to upload images with token which need user login to get, while I am trying to sign up an account
    let trueList = [];
    for (let i = 0; i < filelist.length; i++) {
      trueList.push(URL.createObjectURL(filelist[i]));
    }
    // console.log(value.map((v) => v));
    this.props.onValueUpdate({
      [this.props.inputName]: trueList
    });
  }

  renderImagePreview() {
    // const imageLinks = this.props.value.map((file) => {
    //   // let reader = new FileReader();
    //   // console.log(file);
    //   // return reader.readAsDataURL(file);
    //   return URL.createObjectURL(file);
    // });
    return this.props.value.map((link, index) => {
      return (
        <ImagePreview
          key={index}
          imageSrc={link} />
      );
    });
  }
  render() {
    return (
      <div className={'image-input '+this.props.inputName}>
        <input
          multiple
          onChange={(e) => {
            this.handleUpdate(e.target.files);
          }}
          type="file"
          accept="image/*"
          name={this.props.inputName}
           />
        {this.renderImagePreview()}
      </div>
    );
  }
}

export default ImageInput;
