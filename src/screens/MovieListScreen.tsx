import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearSearch } from '../redux/slices/movieSlice';
import { fetchPopularMovies, searchMovies } from '../redux/thunks/movieThunk';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieListItem from '../components/movieListItem';
import { Result } from '../types/movie';
import { RootState } from '../redux/store';

const MovieListScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const moviesState = useAppSelector((state: RootState) => state.movies || {});
  const popularMovies = moviesState.popularMovies || [];
  const loading = moviesState.loading || false;
  const searchResults = moviesState.searchResults || [];
  const searchQuery = moviesState.searchQuery || '';
  const hasMore = moviesState.pagination?.hasMore || false;
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    // 获取热门电影列表
    dispatch(fetchPopularMovies({ page: 1 }));
  }, [dispatch]);

  const handleSearch = useCallback(() => {
    if (searchInput.trim()) {
      dispatch(searchMovies({ query: searchInput.trim() }));
    } else {
      dispatch(clearSearch());
      dispatch(fetchPopularMovies({ page: 1 }));
    }
  }, [dispatch, searchInput]);

  const handleClearSearch = useCallback(() => {
    setSearchInput('');
    dispatch(clearSearch());
    dispatch(fetchPopularMovies({ page: 1 }));
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    if (searchQuery) {
      dispatch(searchMovies({ query: searchQuery }));
    } else {
      dispatch(fetchPopularMovies({ page: 1 }));
    }
  }, [dispatch, searchQuery]);

  const handleMoviePress = (movieId: number) => {
    // navigateToMovieDetail(movieId);
  };

  const renderMovieItem = ({ item }: { item: Result }) => {
    return <MovieListItem movie={item} />;
  };

  const moviesToShow = searchQuery ? searchResults : popularMovies;

  // 上拉加载更多
  const onEndReached = () => {
    if (!loading && hasMore) {
      if (searchQuery) {
        dispatch(
          searchMovies({
            query: searchQuery,
            page: moviesState.pagination?.currentPage + 1,
          }),
        );
        return;
      }
      dispatch(
        fetchPopularMovies({ page: moviesState.pagination?.currentPage + 1 }),
      );
    }
  };

  const renderFooter = () => {
    if (
      (searchQuery && searchResults.length == 0) ||
      (!searchQuery && popularMovies.length == 0)
    ) {
      return null;
    }
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#49AFEB" />
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      );
    }
    if (!hasMore) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 搜索框 */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="搜索电影..."
          value={searchInput}
          onChangeText={setSearchInput}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchInput.length > 0 && (
          <TouchableOpacity
            onPress={handleClearSearch}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={moviesToShow}
        refreshing={loading}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
        renderItem={renderMovieItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? '没有找到匹配的电影' : '暂无电影数据'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 8,
    padding: 8,
  },
  clearButtonText: {
    fontSize: 18,
    color: '#888',
  },
  listContent: {
    paddingBottom: 16,
  },
  movieItem: {
    flexDirection: 'row',
    margin: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  poster: {
    width: 100,
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  movieInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  releaseDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  detailsButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default MovieListScreen;
