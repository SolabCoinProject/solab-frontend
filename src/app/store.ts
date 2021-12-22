import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import layoutReducer from '../features/layout/layoutSlice';
import userReducer from '../features/user/userSlice';
import tierReducer from '../features/tier/tierSlice';
import projectReducer from '../features/project/projectSlice';
import resourceReducer from '../features/resources/resourceSlice';

console.log(process.env.NODE_ENV);

const sageMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        layout: layoutReducer,
        user: userReducer,
        tier: tierReducer,
        project: projectReducer,
        resource: resourceReducer,
    },
    devTools: process.env.NODE_ENV === 'development' ? true : false,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sageMiddleware),
});

sageMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
