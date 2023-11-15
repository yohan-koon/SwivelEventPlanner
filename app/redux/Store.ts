import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './RootReducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './RootSagas'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [logger, sagaMiddleware];

/**
 * the redux store
 */
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
})

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` 
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>()
// Use throughout your app instead of plain `useSelector`
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;