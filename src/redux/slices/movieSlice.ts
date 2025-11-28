import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPopularMovies, searchMovies } from '../thunks/movieThunk';
import { MovieListResponse, Result } from '../../types/movie';

import { MovieState } from '../../types/movie';

// 初始状态
const initialState: MovieState = {
  popularMovies: [],
  currentMovie: null,
  loading: false,
  error: null,
  searchResults: [],
  searchQuery: '',
  pagination: {
    currentPage: 1,
    totalPages: 0,
    hasMore: false,
  },
};

// 创建电影slice
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSearch: state => {
      state.searchResults = [];
      state.searchQuery = '';
      state.pagination = {
        currentPage: 1,
        totalPages: 0,
        hasMore: false,
      };
    },
  },
  extraReducers: builder => {
    // 处理获取热门电影
    builder
      .addCase(fetchPopularMovies.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        const { page } = action.meta.arg;
        if (page === 1) {
          state.popularMovies = [];
        }
        if (state.searchResults.length != 0) {
          state.searchResults = [];
        }
      })
      .addCase(
        fetchPopularMovies.fulfilled,
        (state, action: PayloadAction<MovieListResponse>) => {
          console.log('action.payload', action.payload);
          const { results, page, total_pages } = action.payload;
          state.loading = false;
          // 处理分页数据
          if (page === 1) {
            // 第一页，直接替换数据
            state.popularMovies = results;
          } else {
            state.popularMovies = [...state.popularMovies, ...results];
          }
          state.pagination = {
            currentPage: page,
            totalPages: total_pages,
            hasMore: page < total_pages,
          };
        },
      )
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // 处理搜索电影
      .addCase(searchMovies.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        if (action.meta.arg.page === 1) {
          state.searchResults = [];
        }
        if (state.popularMovies.length != 0) {
          state.popularMovies = [];
        }
      })
      .addCase(
        searchMovies.fulfilled,
        (
          state,
          action: PayloadAction<MovieListResponse & { query: string }>,
        ) => {
          const { results, page, total_pages } = action.payload;
          console.log('action.payload search', action.payload);
          state.loading = false;
          // 处理分页数据
          if (page === 1) {
            // 第一页，直接替换数据
            state.searchResults = results;
          } else {
            state.searchResults = [...state.searchResults, ...results];
          }
          state.pagination = {
            currentPage: page,
            totalPages: total_pages,
            hasMore: page < total_pages,
          };
          state.searchQuery = action.payload.query;
        },
      )
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // // 处理获取电影详情
    // .addCase(fetchMovieDetails.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchMovieDetails.fulfilled, (state, action: PayloadAction<Movie>) => {
    //   state.loading = false;
    //   state.currentMovie = action.payload;
    // })
    // .addCase(fetchMovieDetails.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload as string;
    // })
  },
});

export const { clearSearch } = movieSlice.actions;
export default movieSlice.reducer;
