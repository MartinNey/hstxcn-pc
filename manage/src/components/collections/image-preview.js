import React, { Component } from 'react';
import './image-preview.css';

class ImagePreview extends Component {


  render() {
    const bgiStyle = {
      backgroundImage: 'url(\'' + this.props.imageSrc + '\')'
    };
    return (
      <div className="image-preview">
        <div style={bgiStyle} />
      </div>
    );
  }
}

export default ImagePreview;
