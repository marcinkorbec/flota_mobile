import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from './components/SplashScreen/SplashScreen';
import { LoginScreen } from './components/LoginScreen/LoginScreen';
import { HomeScreen } from './components/HomeScreen/HomeScreen';
import { RoadFeesScreen } from './components/RoadFeesScreen/RoadFeesScreen';
import { AddFuelScreen } from './components/AddFuelScreen/AddFuelScreen';
import { DriverCostsScreen } from './components/DriverCostsScreen/DriverCostsScreen';
import { FuelingScreen } from './components/FuelingScreen/FuelingScreen';
import { AddDriverCostScreen } from './components/DriverCostsScreen/AddDriverCostScreen';
import { AddRoadFeesScreen } from './components/RoadFeesScreen/AddRoadFeesScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';



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
            {/* <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Moje tankowania' }} />
            <Stack.Screen name="AddFuelScreen" component={AddFuelScreen} options={{ title: 'Nowe tankowanie', headerTitleAlign: 'center' }} />
            <Stack.Screen name="RoadFeesScreen" component={RoadFeesScreen} options={{ title: 'Koszty drogowe', headerTitleAlign: 'center' }} />
            <Stack.Screen name="DriverCostsScreen" component={DriverCostsScreen} options={{ title: 'Koszty własne', headerTitleAlign: 'center' }} />
            <Stack.Screen name="FuelingScreen" component={FuelingScreen} options={{ title: 'Historia tankowań', headerTitleAlign: 'center' }} />
            <Stack.Screen name="AddDriverCostsScreen" component={AddDriverCostScreen} options={{ title: 'Nowy koszt własny', headerTitleAlign: 'center' }} />
            <Stack.Screen name="AddRoadFeesScreen" component={AddRoadFeesScreen} options={{ title: 'Nowy koszt drogowy', headerTitleAlign: 'center' }} />
        </Stack.Navigator>
    );
}

export default function App() {

    return (

        <SafeAreaProvider>
            <NavigationContainer >
                <MyStack />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
