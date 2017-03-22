import { call, put } from 'redux-saga/effects'
import { didFetchSubreddit } from '../modules/reddit'
import api from '../services/api'

export default function * fetchSubredditPosts ({payload}) {
  const { subreddit, onComplete } = payload
  const posts = yield call(api.fetchPosts, subreddit)
  yield put(didFetchSubreddit({posts}))

  if (onComplete != null) {
    yield call(onComplete)
  }
}
