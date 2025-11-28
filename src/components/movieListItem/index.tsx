import React, { useState, memo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Result } from '../../types/movie';

// 获取屏幕宽度，用于计算海报尺寸
const { width } = Dimensions.get('window');
const POSTER_WIDTH = width * 0.3;
const POSTER_HEIGHT = POSTER_WIDTH * 1.5;

interface MovieListItemProps {
  movie: Result;
  onPress?: (movie: Result) => void;
  isLoading?: boolean;
  key?: string | number;
}

/**
 * 电影列表项组件
 * 展示电影的海报、标题、评分等基本信息
 */
const MovieListItem: React.FC<MovieListItemProps> = ({
  movie,
  onPress,
  isLoading = false,
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const handlePress = () => {
    if (onPress) {
      onPress(movie);
    } else {
      // 如果没有提供onPress回调，显示电影信息提示
      Alert.alert(
        '电影信息',
        `标题: ${movie.title}\n评分: ${movie.vote_average.toFixed(1)}\n年份: ${
          movie.release_date ? movie.release_date.split('-')[0] : '未知'
        }`,
        [{ text: '确定', style: 'default' }],
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.posterContainer}>
        {isLoading || imageLoading ? (
          <View style={[styles.poster, styles.posterPlaceholder]}>
            <ActivityIndicator size="small" color="#ccc" />
          </View>
        ) : imageError ? (
          <View style={[styles.poster, styles.posterError]}>
            <Text style={styles.errorText}>加载失败</Text>
          </View>
        ) : null}

        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/150',
          }}
          style={isLoading || imageLoading || imageError ? null : styles.poster}
          resizeMode="cover"
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false);
            setImageError(true);
          }}
        />
      </View>

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>

          <Text style={styles.releaseDate}>
            {movie.release_date ? movie.release_date.split('-')[0] : '未知年份'}
          </Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
          </View>
        </View>

        <Text style={styles.overview} numberOfLines={3}>
          {movie.overview || '暂无简介'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
  },
  posterContainer: {
    marginRight: 12,
  },
  poster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: 8,
  },
  posterPlaceholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterError: {
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9500',
  },
  overview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

// 使用memo优化组件，避免不必要的渲染
export default memo(MovieListItem, (prevProps, nextProps) => {
  // 只有当关键属性变化时才重新渲染
  return (
    prevProps.movie.id === nextProps.movie.id &&
    prevProps.isLoading === nextProps.isLoading
  );
});
