import React, { Component } from 'react';
import Axios from 'axios';
import Alert from 'react-s-alert';
import RectImage from "../collections/rect-image";
import {Link} from 'react-router-dom';
import BaseImageUploader from "../collections/base-image-uploader";
import UserList from "../user/user-list";
import './admin.css';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themes: [],
      banners: [],
      photographers: [],
      collections: []
    };
    this.loadAll = this.loadAll.bind(this);
  }
  componentWillMount() {
    this.loadAll();
  }
  loadAll() {
    const fuckingLoadRequests = [
      {
        url: '/api/theme',
        state: 'themes',
        err: '获取主题失败，请检查网络连接'
      },
      {
        url: '/api/home/banner',
        state: 'banners',
        err: '获取 banner 失败，请检查网络连接'
      },
      {
        url: '/api/home/photographer',
        state: 'photographers',
        err: '获取推荐摄影师失败，请检查网络连接'
      },
      {
        url: '/api/home/collection',
        state: 'collections',
        err: '获取推荐图集失败，请检查网络连接'
      },
    ];
    fuckingLoadRequests.map((request) => {
      return Axios({
        url: request.url,
        headers: {
          Authorization: this.props.auth,
        },
        method: 'get'
      }).then((res) => {
        this.setState({
          [request.state]: res.data
        });
      }).catch((err) => {
        console.error(err);
        Alert.error(request.err);
      });
    });
  }
  removeHomeCollection(id) {
    return Axios({
      url: `/api/home/collection/${id}`,
      headers: {
        Authorization: this.props.auth,
      },
      method: 'delete',
    }).then((res) => {
      Alert.success(`删除一份图集`);
      this.loadAll();
    }).catch((err) => {
      console.err(err);
      Alert.error('删除失败，请检查网络链接');
    });
  }
  removeBanner(id) {
    return Axios({
      url: `/api/home/banner/${id}`,
      headers: {
        Authorization: this.props.auth,
      },
      method: 'delete',
    }).then((res) => {
      Alert.success(`删除一张图片`);
      this.loadAll();
    }).catch((err) => {
      console.err(err);
      Alert.error('删除失败，请检查网络链接');
    });
  }
  render() {
    const allThemes = this.state.themes ? this.state.themes.map((theme, index) => {
      return (<div className="home-single-theme" key={index}>
        <RectImage url={theme.cover.compressed_path} detail={theme.cover.path} name={theme.name}/>
        <div className="no-float" />
      </div>);
    }) : null;
    const userEle = (user, index, onClick) => (
      <li key={index}>
        <Link key="index" to={`/user/${user.id}`}>
          <div className="user-list-par user-list-number">{`${user.number}`}</div>
          <div className="user-list-par user-list-name">{`${user.name}`}</div>
          <div className="user-list-par user-list-description">{user.description || '<无描述>'}</div>
          <div className="user-list-par user-list-status" />
        </Link>
        <div
          onClick={onClick}
          className="user-list-par user-list-button"
        >
          删除
        </div>
      </li>
    );

    const photographers = this.state.photographers;
    const photographersConfig = {
      reviewed: {
        name: '已通过审核',
        buttonText: '删除',
        anotherText: '无操作',
        clickHandler: (user) => Axios({
          url: `/api/home/photographer/${user.id}`,
          headers: {
            Authorization: this.props.auth,
          },
          method: 'delete'
        }).then(() => {
          Alert.success(`已取消用户'${user.name}'首页摄影师推荐`);
          this.props.onUpdate();
        }).catch((err) => {
          Alert.error(`出错，${err}`);
        }),
        anotherHandler: () => console.log('click~click~')
      }
    };
    const collectionUsers = this.state.collections.map((collection) => {
      return collection.photographer;
    });
    const collectionConfig = {
      reviewed: {
        name: '已通过审核',
        buttonText: '删除',
        anotherText: '无操作',
        clickHandler: (user) => Axios({
          url: `/api/home/collection/${user.collection.id}`,
          headers: {
            Authorization: this.props.auth,
          },
          method: 'delete'
        }).then(() => {
          Alert.success(`已取消用户'${user.name}'首页图集推荐`);
          this.props.onUpdate();
        }).catch((err) => {
          Alert.error(`出错，${err}`);
        }),
        anotherHandler: () => console.log('click~click~')
      }
    };

    const allBanners = this.state.banners ? this.state.banners.map((banner, index) => {
      return (<div className="home-single-banner" key={index}>
        <RectImage
          url={banner.cover.compressed_path}
          deta
          name={banner.id}
          onRemove={() => this.removeBanner(banner.id)}/>
        <div className="no-float" />
      </div>);
    }) : null;

    return (<div>
      <div className="home-themes">
        <p className="home-sub-title">主题</p>
        {allThemes}
      </div>
      <div className="home-photographers">
        <p className="home-sub-title">推荐摄影师</p>
        <UserList users={photographers} statusConfig={photographersConfig}/>
      </div>
      <div className="home-collections">
        <p className="home-sub-title">推荐图集</p>
        <UserList users={collectionUsers} statusConfig={collectionConfig}/>
      </div>
      <div className="home-banners">
        <p className="home-sub-title">首页图</p>
        {allBanners}
        <BaseImageUploader
          {...this.props}
          maxImages={12 - (this.state.banners ? this.state.banners.length : 0)}
          onUpdate={this.loadAll}
          dataName="cover"
          description="banner"
          imageUploadUrl={`/api/home/banner`}/>
      </div>
    </div>);
  }
}

Admin.propTypes = {
  auth: React.PropTypes.string,
  onUpdate: React.PropTypes.func,
};

export default Admin;