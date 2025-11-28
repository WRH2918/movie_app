import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchMovieDetails } from '../redux/thunks/movieThunk';
import { MovieDetailResponse } from '../types/movie';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp, ScreenRouteProp } from '../routes';
import { RootState } from '../redux/store';
// import { fetchMovieDetails, Movie } from '../redux/slices/movieSlice';

const MovieDetailScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp<'MovieDetail'>>();
  const { movieId } = useRoute<ScreenRouteProp<'MovieDetail'>>().params;
  // 模拟电影ID，实际应该从路由参数获取
  // const [movieId] = useState<number>(1); // 默认电影ID为1
  const dispatch = useAppDispatch();
  // 修复类型问题，添加默认值和类型断言
  const moviesState = useAppSelector(
    (state: RootState) => state.movieDetail || {},
  );
  const currentMovie: MovieDetailResponse | null =
    moviesState.currentMovie || null;
  const loading = moviesState.loading || false;
  const error = moviesState.error || null;

  useEffect(() => {
    // 获取电影详情
    dispatch(fetchMovieDetails(movieId));
  }, [dispatch, movieId]);

  useEffect(() => {
    // 处理错误
    if (error) {
      Alert.alert('错误', error);
    }
  }, [error]);

  // handleBack函数已经在上面定义

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  if (!currentMovie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>电影信息加载失败</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>返回</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const imageUrl = currentMovie.poster_path
    ? `https://image.tmdb.org/t/p/original${currentMovie.poster_path}`
    : 'https://via.placeholder.com/300x450';

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 返回按钮 */}
        <TouchableOpacity
          style={styles.backButtonTop}
          onPress={() => navigation.goBack()}
        >
          {/* <Text style={styles.backButtonTopText}>←</Text> */}
          <Image
            source={require("../assets/imgs/back.png")}
            style={styles.backButtonTopImage}
            tintColor={'#fff'}
          />
        </TouchableOpacity>

        {/* 电影海报 */}
        <View style={styles.posterContainer}>
          <Image source={{ uri: imageUrl }} style={styles.poster} />
        </View>

        {/* 电影信息 */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{currentMovie.title}</Text>

          <View style={styles.metaInfo}>
            <Text style={styles.releaseDate}>
              日期：{currentMovie.release_date}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingLabel}>评分：</Text>
              <Text style={styles.rating}>
                {currentMovie.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>

          <Text style={styles.runtime}>时长：{currentMovie.runtime}分钟</Text>

          <View style={styles.genreContainer}>
            {currentMovie.genres.map(genre => (
              <Text key={genre.id} style={styles.genre}>
                {genre.name}
              </Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>简介</Text>
            <Text style={styles.overview}>{currentMovie.overview}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButtonTop: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
  },
  backButtonTopImage: {
    width: 20,
    height: 20,
  },
  posterContainer: {
    width: '100%',
    height: 400,
    backgroundColor: '#000',
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 12,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 12,
    color: '#666',
  },
  rating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  overview: {
    fontSize: 12,
    lineHeight: 20,
    color: '#444',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  genre: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  runtime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
});

export default MovieDetailScreen;
