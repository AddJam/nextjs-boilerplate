import { createAction } from 'redux-actions'

const initialState = {
  name: 'Billy'
}

export const SET_NAME = 'SET_NAME'

export const setName = createAction(SET_NAME)

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.payload
      }

    default:
      return state
  }
}

export const nameSelector = (state) => state.user.name
