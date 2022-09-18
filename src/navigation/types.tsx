import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  MapScreen: undefined;
  EatsScreen: undefined;
};

export type CardParamList = {
  RideOptionsCard: undefined;
  NavigateCard: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type HomeScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type CardNavigationProp = NativeStackNavigationProp<CardParamList>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
