import { createAction } from 'redux-actions'

const initialState = {
  loading: false,
  posts: []
}

export const FETCH_SUBREDDIT = 'FETCH_SUBREDDIT'
export const DID_FETCH_SUBREDDIT = 'DID_FETCH_SUBREDDIT'

export const fetchSubreddit = createAction(FETCH_SUBREDDIT)
export const didFetchSubreddit = createAction(DID_FETCH_SUBREDDIT)

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SUBREDDIT:
      return {
        ...state,
        loading: true,
        posts: []
      }

    case DID_FETCH_SUBREDDIT:
      return {
        ...state,
        loading: false,
        posts: action.payload.posts
      }

    default:
      return state
  }
}

export const postsSelector = (state) => state.reddit.posts
export const postsLoadingSelector = (state) => state.reddit.postsLoading
