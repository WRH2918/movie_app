import { createSlice } from '@reduxjs/toolkit';
import { MovieDetailState } from '../../types/movie';
import { fetchMovieDetails } from '../thunks/movieThunk';

// 初始状态
const initialState: MovieDetailState = {
  currentMovie: null,
  loading: false,
  error: null,
};

// 创建电影详情slice
const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovieDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        console.log('action.payload', action.payload);
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default movieDetailSlice.reducer;
