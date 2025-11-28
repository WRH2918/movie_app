import React from 'react';
import MovieListScreen from '../screens/MovieListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const RootStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MovieList" component={MovieListScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;

export type RootStackParamList = {
  MovieList: undefined;
  MovieDetail: { movieId: number };
};
