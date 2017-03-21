import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { nextConnect } from '../src/config/store'
import {
  postsSelector, postsLoadingSelector, fetchSubreddit
} from '../src/modules/reddit'
import { style, rehydrate } from 'glamor'

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  rehydrate(window.__NEXT_DATA__.ids)
}

class IndexPage extends Component {
  static getInitialProps ({store, isServer}) {
    console.log('Is server: ', isServer)
    console.log(store)

    return new Promise((resolve, reject) => {
      store.dispatch(fetchSubreddit({
        subreddit: 'nintendoswitch',
        onComplete: () => {
          resolve({
            posts: postsSelector(store.getState())
          })
        }
      }))
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      subreddit: 'nintendoswitch'
    }
  }

  render () {
    const { loading, posts, fetchSubreddit } = this.props

    return (
      <div {...styles.page}>
        <h1>On r/{this.state.subreddit}:</h1>
        <div>
          <input
            value={this.state.subreddit}
            onChange={(e) => this.setState({subreddit: e.target.value})} />
          <button onClick={() => {
            fetchSubreddit({subreddit: this.state.subreddit})
          }}>
            Load
          </button>
        </div>
        {loading && <p>Loading</p>}
        {posts.map(post =>
          <p key={post.data.id} {...styles.item}>{post.data.title}</p>
        )}
      </div>
    )
  }
}

const styles = {
  page: style({
    color: 'red',
    fontSize: 50
  }),
  item: style({
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderBottomStyle: 'solid'
  })
}

const mapStateToProps = (state) => ({
  posts: postsSelector(state),
  loading: postsLoadingSelector(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchSubreddit
}, dispatch)

export default nextConnect(mapStateToProps, mapDispatchToProps)(IndexPage)
