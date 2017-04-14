import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Alert from 'react-s-alert';
import deleteImg from '../../delete.png';
import './collections.css';

class Collections extends Component {
  constructor(props) {
    super(props);
    this.allCollections = this.allCollections.bind(this);
  }
  onDelete(collection) {
    Axios({
      url: `/api/user/collection/${collection.id}`,
      method: 'delete',
      headers: {'Authorization': this.props.auth},
    }).then(() => {
      Alert.success(`删除图集"${collection.name}"`);
      this.props.onUpdate();
    }).catch((err) => {
      this.props.onError(err);
    });
  }
  allCollections() {
    return this.props.collections.map((collection) => {
      return (
        <li
          key={collection.id}
          className="collection">
          <Link to={`/collection/${collection.id}`}>
            <p className="collection-name">{collection.name}</p>
            <p className="collection-detail">{collection.description || '<无描述>'}</p>
          </Link>
          <img className="delete-collection"
               src={deleteImg}
               alt="delete"
               onClick={() => this.onDelete(collection)}
          />
          <div className="no-float" />
        </li>
      );
    });
  }
  render() {
    return (
      <div className="collections">
        <div className="collections-title">图集管理</div>
        <button onClick={() => {
          this.props.history.push('/new/collection');
        }}>新建</button>
        <ul>
          <li>
            <p className="collection-name">图集名字</p>
            <p className="collection-detail">详情</p>
            <div className="no-float" />
          </li>
          {this.allCollections()}
        </ul>
      </div>
    );
  }
}
Collections.propTypes = {
  readOnly: React.PropTypes.bool,
  auth: React.PropTypes.string,
  collections: React.PropTypes.array,
  history: React.PropTypes.object,
  onUpdate: React.PropTypes.func,
  onError: React.PropTypes.func,
};

export default Collections;
