import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './user/slice'

const rootReducer = combineReducers({
    user: userSlice.reducer,
});
  
export default rootReducer;