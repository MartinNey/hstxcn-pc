import React, { Component } from 'react';
import './rect-image.css';

class RectImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: false
    };
  }
  render() {
    return (
      <div
        onClick={(e) => {
          if (e.target.className === 'delete-button') {
            return;
          }
          const detail = !this.state.detail;
          this.setState({
            detail: detail
          });
        }}
        className={'image-preview image-preview-'+(this.state.detail ?
          'detail':
          'not-detail')}>
        <div className="hover-info">
          <span
            className="delete-button"
            onClick={(e) => {
              this.props.onRemove();
            }}
          >&times;</span>
          <div className="image-info">{this.props.name || ''}</div>
        </div>
        <div style={{backgroundImage: 'url(' + encodeURI(this.state.detail ? this.props.detail : this.props.url) + ')'}} />
      </div>
    );
  }
}
RectImage.propTypes = {
  url: React.PropTypes.string,
  detail: React.PropTypes.string,
  name: React.PropTypes.string,
  onUndo: React.PropTypes.func,
  onRemove: React.PropTypes.func,
};
export default RectImage;
