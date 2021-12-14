import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import layoutReducer from '../features/layout/layoutSlice';
import userReducer from '../features/user/userSlice';
import tierReducer from '../features/tier/tierSlice';

const sageMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        layout: layoutReducer,
        user: userReducer,
        tier: tierReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sageMiddleware),
});

sageMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
