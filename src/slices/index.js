import { combineReducers } from 'redux'

import tasksReducer from './tasks'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  // other reducers if we had more state to manage
})

export default rootReducer