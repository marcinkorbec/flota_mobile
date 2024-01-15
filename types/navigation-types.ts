import { StackNavigationProp } from '@react-navigation/stack';

// typy dla stosu nawigacji
export type RootStackParamList = {
    SplashScreen: undefined;
    LoginScreen: undefined;
    HomeScreen: undefined;
};

export type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;