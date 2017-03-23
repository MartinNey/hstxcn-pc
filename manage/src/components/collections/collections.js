import React, { Component } from 'react';
// import axios from 'axios';

class Collections extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const collections = this.props.collections.map((value) => (
      <div>value.name</div>
    ));
    return (
      <div className="collections">
        {collections}
      </div>
    );
  }
}
Collections.propTypes = {
  collections: React.PropTypes.array
};

export default Collections;