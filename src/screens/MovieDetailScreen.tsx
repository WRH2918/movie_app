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
  SafeAreaView,
  BackHandler,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchMovieDetails, Movie } from '../redux/slices/movieSlice';

const MovieDetailScreen: React.FC = () => {
  // 模拟电影ID，实际应该从路由参数获取
  const [movieId] = useState<number>(1); // 默认电影ID为1
  const dispatch = useAppDispatch();
  // 修复类型问题，添加默认值和类型断言
  const moviesState = useAppSelector((state: any) => state.movies || {});
  const currentMovie: Movie | null = moviesState.currentMovie || null;
  const loading = moviesState.loading || false;
  const error = moviesState.error || null;

  // 处理返回功能
  const handleBack = () => {
    Alert.alert('返回', '是否返回电影列表？', [
      { text: '取消', style: 'cancel' },
      { text: '确定', onPress: () => BackHandler.exitApp() }, // 简单模拟返回
    ]);
  };

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
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>返回</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const imageUrl = currentMovie.poster_path
    ? `https://image.tmdb.org/t/p/original${currentMovie.poster_path}`
    : 'https://via.placeholder.com/300x450';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 返回按钮 */}
        <TouchableOpacity style={styles.backButtonTop} onPress={handleBack}>
          <Text style={styles.backButtonTopText}>← 返回</Text>
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
              发布日期：{currentMovie.release_date}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingLabel}>评分：</Text>
              <Text style={styles.rating}>
                {currentMovie.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>简介</Text>
            <Text style={styles.overview}>{currentMovie.overview}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  backButtonTopText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  releaseDate: {
    fontSize: 16,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 16,
    color: '#666',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});

export default MovieDetailScreen;
