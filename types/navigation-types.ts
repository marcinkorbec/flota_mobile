import { StackNavigationProp } from '@react-navigation/stack';

// typy dla stosu nawigacji
export type RootStackParamList = {
    SplashScreen: undefined;
    LoginScreen: undefined;
    HomeScreen: undefined;
    AddFuelScreen: undefined;
    RoadFeesScreen: undefined;
    DriverCostsScreen: undefined;
    FuelingScreen: undefined;
    AddDriverCostsScreen: undefined;
    AddRoadFeesScreen: undefined;
};

export type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
export type AddFuelScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddFuelScreen'>;
export type RoadFeesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RoadFeesScreen'>;
export type DriverCostsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DriverCostsScreen'>;
export type FuelingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FuelingScreen'>;
export type AddDriverCostsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddDriverCostsScreen'>;
export type AddRoadFeesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddRoadFeesScreen'>;