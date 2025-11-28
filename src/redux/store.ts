import { configureStore } from '@reduxjs/toolkit';
import { MovieState } from '../types/movie';

// 动态导入reducer以避免循环依赖
const createStore = () => {
  // 运行时导入
  const { default: reducer } = require('./slices/movieSlice');

  return configureStore({
    reducer: {
      movies: reducer,
    },
  });
};

export const store = createStore();
// 明确RootState类型，避免movies属性为unknown
interface RootStateType {
  movies: MovieState;
}
export type RootState = RootStateType;
export type AppDispatch = typeof store.dispatch;
