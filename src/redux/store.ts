import { configureStore } from '@reduxjs/toolkit';
import { MovieDetailState, MovieState } from '../types/movie';

// 动态导入reducer以避免循环依赖
const createStore = () => {
  // 运行时导入
  const { default: movieReducer } = require('./slices/movieSlice');
  const { default: movieDetailReducer } = require('./slices/movieDetailSlice');

  return configureStore({
    reducer: {
      movies: movieReducer,
      movieDetail: movieDetailReducer,
    },
  });
};

export const store = createStore();
// 明确RootState类型，避免movies属性为unknown
interface RootStateType {
  movies: MovieState;
  movieDetail: MovieDetailState;
}
export type RootState = RootStateType;
export type AppDispatch = typeof store.dispatch;
