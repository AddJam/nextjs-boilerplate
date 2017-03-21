import { takeEvery } from 'redux-saga/effects'
import { FETCH_SUBREDDIT } from '../modules/reddit'
import fetchSubredditPosts from './fetchSubredditPosts'

export default function * rootSaga () {
  console.log('Starting sagas')

  yield [
    takeEvery(FETCH_SUBREDDIT, fetchSubredditPosts)
  ]
}
