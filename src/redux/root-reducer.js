import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer'
import messageReducer from './public/message/message.reducer'
import studentReducer from './student/student.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
}

const rootReducer = combineReducers({
  user: userReducer,
  publicMessage: messageReducer,
  students: studentReducer,
})

export default persistReducer(persistConfig, rootReducer)
