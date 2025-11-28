export interface MovieListResponse {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// 电影状态接口
export interface MovieState {
  popularMovies: Result[];
  currentMovie: Result | null;
  loading: boolean;
  error: string | null;
  searchResults: Result[];
  searchQuery: string;
  pagination: {
    currentPage: number;
    totalPages: number;
    hasMore: boolean;
  };
}
