import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './user/slice'
import { organizersSlice } from './organizers/slice'
import { photosSlice } from './photos/slice'
import { postsSlice } from './posts/slice'


const rootReducer = combineReducers({
    user: userSlice.reducer,
    organizers: organizersSlice.reducer,
    photos: photosSlice.reducer,
    posts: postsSlice.reducer,
});
  
export default rootReducer;