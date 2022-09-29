import React from 'react'
// import dayjs from 'dayjs'
import { v4 as uiid } from 'uuid'
import './index.css'
import avatar from './images/avatar.png'

class App extends React.Component {
  // 依赖的数据
  state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
      {
        id: 1,
        name: '热度',
        type: 'hot'
      },
      {
        id: 2,
        name: '时间',
        type: 'time'
      }
    ],
    active: 'hot', // 控制tab标签激活的状态
    list: [
      {
        id: 1,
        author: '刘德华',
        comment: '给我一杯忘情水',
        time: new Date('2021-10-10 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1
      },
      {
        id: 2,
        author: '周杰伦',
        comment: '哎哟，不错哦',
        time: new Date('2021-10-11 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0
      },
      {
        id: 3,
        author: '五月天',
        comment: '不打扰，是我的温柔',
        time: new Date('2021-10-11 10:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1
      }
    ],
    comment: '', // 评论框中的内容
  }

  /** 格式化时间 */
  formatTime = (time) => {
    /** 1. 第三方依赖 */
    // return dayjs(time).format("YYYY-MM-DD")
    /** 2. 原生js */
    return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
  }

  /** 切换标签 */
  toggleTab = (tabType) => {
    this.setState({
      active: tabType
    })
  }

  /** 评论回调 受控组件 */
  commentChange = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  /** 发表评论 */
  submitComment = () => {
    /** state.list 添加新的item */
    this.setState({
      list: [
        ...this.state.list,
        {
          id: uiid(), // 生成唯一值
          author: 'dea',
          comment: this.state.comment,
          time: new Date(),
          // 1: 点赞 0：无态度 -1:踩
          attitude: 0
        }
      ],
      /** 清空textarea里的comment评论 */
      comment: ''
    })
  }

  /** 删除评论回调 */
  removeComment = (id) => {
    this.setState({
      list: this.state.list.filter(item => item.id !== id)
    })
  }

  /** 切换喜欢 */
  toggleLike = (curItem, type) => {
    // curItem中的关键字段 id(唯一标识)
    const { id } = curItem
    this.setState({
      list: this.state.list.map(item => {
        // 判断条件 如果 item.id === id 就把item里的attitude修改
        // 否则就原样返回
        if (item.id === id) {
          return {
            ...item,
            // 当属性发生重复 会以后出现的字段属性值为主 进行覆盖
            attitude: type
          }
        } else {
          return item
        }
      })
    })
  }

  render () {
    return (
      <div className="App">
        <div className="comment-container">
          {/* 评论数 */}
          <div className="comment-head">
            <span>5 评论</span>
          </div>
          {/* 排序 */}
          <div className="tabs-order">
            <ul className="sort-container">
              {this.state.tabs.map(tab =>
                <li
                  key={tab.id}
                  onClick={() => this.toggleTab(tab.type)}
                  className={tab.type === this.state.active ? 'on' : ''}
                >
                  按{tab.name}排序
                </li>
              )}
            </ul>
          </div>

          {/* 添加评论 */}
          <div className="comment-send">
            <div className="user-face">
              <img className="user-head" src={avatar} alt="" />
            </div>
            <div className="textarea-container">
              {/* 输入框 受控组件 */}
              <textarea
                cols="80"
                rows="5"
                placeholder="发条友善的评论"
                className="ipt-txt"
                onChange={this.commentChange}
                value={this.state.comment}
              />
              <button className="comment-submit" onClick={this.submitComment}>发表评论</button>
            </div>
            <div className="comment-emoji">
              <i className="face"></i>
              <span className="text">表情</span>
            </div>
          </div>

          {/* 评论列表 */}
          <div className="comment-list">
            {this.state.list.map(item =>
              <div className="list-item" key={item.id}>
                <div className="user-face">
                  <img className="user-head" src={avatar} alt="" />
                </div>
                <div className="comment">
                  <div className="user">{item.author}</div>
                  <p className="text">{item.comment}</p>
                  <div className="info">
                    <span className="time">{this.formatTime(item.time)}</span>
                    {/* 动态控制类名 */}
                    <span
                      onClick={() => this.toggleLike(item, 1)}
                      className={item.attitude === 1 ? 'liked like' : 'like'}
                    >
                      <i className="icon" />
                    </span>
                    <span
                      onClick={() => this.toggleLike(item, -1)}
                      className={item.attitude === -1 ? 'hated hate' : 'hate'}
                    >
                      <i className="icon" />
                    </span>
                    <span className="reply btn-hover" onClick={() => this.removeComment(item.id)}>删除</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
