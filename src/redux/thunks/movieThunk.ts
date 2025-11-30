import { createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '../../services/httpClient';

// 获取热门电影的异步thunk
export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async (
    params: {
      page?: number;
      genre?: string;
      sortBy?: string;
      query?: string;
      language?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const {
        page = 1,
        genre = '',
        sortBy = 'popularity.desc',
        query = '',
        language = 'zh-CN',
      } = params;
      const response = await httpClient.get('/movie/popular', {
        params: {
          include_adult: false,
          include_video: false,
          language: language,
          page: page,
          sort_by: sortBy,
          genre_id: genre,
          query: query,
        },
      });

      if (response.status !== 200) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.data;
      console.log('data', data);
      return data;
    } catch (error: any) {
      console.log('error', error);
      return rejectWithValue(error.message || 'Failed to fetch movies');
    }
  },
);

// 获取电影详情的异步thunk
export const fetchMovieDetails = createAsyncThunk(
  'movieDetail/fetchDetails',
  async (movieId: number, { rejectWithValue }) => {
    console.log('movieId', movieId);
    try {
      const response = await httpClient.get(`/movie/${movieId}`, {
        params: {
          language: 'zh-CN',
        },
      });
      if (response.status !== 200) {
        throw new Error(`API error: ${response.status}`);
      }
      console.log('response', response);
      const data = await response.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch movie details');
    }
  },
);

// 搜索电影的异步thunk
export const searchMovies = createAsyncThunk(
  'movies/search',
  async (
    params: {
      page?: number;
      query?: string;
      language?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { page = 1, query = '', language = 'zh-CN' } = params;
      const response = await httpClient.get('/search/movie', {
        params: {
          query: encodeURIComponent(query),
          page: page,
          language: language,
        },
      });

      if (response.status !== 200) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.data;
      return { ...data, query: params.query || '' };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to search movies');
    }
  },
);

// 电影演员的异步thunk
export const fetchMovieCredits = createAsyncThunk(
  'movieDetail/credits',
  async (movieId: number, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(`movie/${movieId}/credits`, {
        params: {
          language: 'zh-CN',
        },
      });

      if (response.status !== 200) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch movie credits');
    }
  },
);
