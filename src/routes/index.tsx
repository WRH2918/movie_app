import React from 'react';
import MovieListScreen from '../screens/MovieListScreen';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import { RouteProp } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const RootStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MovieList" component={MovieListScreen} />
      <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;

export type RootStackParamList = {
  MovieList: undefined;
  MovieDetail: { movieId: number };
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
