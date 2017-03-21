import config from '../config'
import { create } from 'apisauce'

// define the api
const api = create({
  baseURL: config.apiHost,
  headers: {'Accept': 'application/json'}
})

export default {
  fetchPosts (subreddit) {
    return api
      .get(`/r/${subreddit}.json`)
      .then((response) => {
        return response.data.data.children
      })
  }
}
