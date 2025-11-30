import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieListItem from '../src/components/movieListItem';
import { Result } from '../src/types/movie';

// 模拟电影数据
const mockMovie: Result = {
  adult: false,
  backdrop_path: '/path/to/backdrop.jpg',
  genre_ids: [18, 80],
  id: 123,
  original_language: 'en',
  original_title: 'Test Movie',
  overview: 'This is a test movie overview',
  popularity: 8.5,
  poster_path: '/path/to/poster.jpg',
  release_date: '2023-01-15',
  title: 'Test Movie',
  video: false,
  vote_average: 8.7,
  vote_count: 1200,
};

describe('MovieListItem 组件', () => {
  test('正常渲染电影信息', () => {
    const { getByText } = render(<MovieListItem movie={mockMovie} />);

    // 验证电影标题、年份和评分是否正确渲染
    expect(getByText('Test Movie')).toBeTruthy();
    expect(getByText('2023')).toBeTruthy();
    expect(getByText('8.7')).toBeTruthy();
  });

  test('点击组件时调用onPress回调', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <MovieListItem movie={mockMovie} onPress={onPressMock} />,
    );

    // 模拟点击组件
    fireEvent.press(getByText('Test Movie'));

    // 验证onPress回调被调用且参数正确
    expect(onPressMock).toHaveBeenCalledWith(123);
  });
});
