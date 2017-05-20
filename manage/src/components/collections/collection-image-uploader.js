import React, { Component } from 'react';

import BaseImageUploader from './base-image-uploader';

// TODO: will receive collection id as argument in url
class CollectionImageUploader extends Component {
  render() {
    return (
      <BaseImageUploader
        imageUploadUrl={`/api/user/collection/${this.props.uuid}/works`}
        {...this.props}
      />
    );
  }
}

CollectionImageUploader.propTypes = {
  uuid: React.PropTypes.string
};

export default CollectionImageUploader;