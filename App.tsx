import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './components/SplashScreen/SplashScreen';
import LoginScreen from './components/LoginScreen/LoginScreen';
import HomeScreen from './components/HomeScreen/HomeScreen';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#E8364F',
                },
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Moje tankowania' }} />
        </Stack.Navigator>
    );
}

export default function App() {
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#E8364F',
        },
    };
    return (
        <NavigationContainer >
            <MyStack />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        border: '1x solid red',
    },
});
