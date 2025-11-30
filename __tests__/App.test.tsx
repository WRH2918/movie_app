/**
 * @format
 */

import React from 'react';
import App from '../App';
import { render } from '@testing-library/react-native';

// 模拟React Navigation的NavigationContainer
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => {
    return children;
  },
}));

// 模拟Redux Provider
jest.mock('react-redux', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => {
    return children;
  },
}));

// 模拟Redux store
jest.mock('../src/redux/store', () => ({
  store: {},
}));

// 模拟路由组件
jest.mock('../src/routes', () => {
  return function MockRootStack() {
    return null;
  };
});

test('renders correctly', () => {
  const tree = render(<App />);
  expect(tree).toBeTruthy();
});
