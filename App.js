import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from './screens/MainMenu';
import ExchangeScreen from './screens/ExchangeScreen';
import PlotsScreen from './screens/PlotsScreen';
export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<>
			<StatusBar style='dark' />
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name='MainMenu' component={MainMenu} />
					<Stack.Screen name='Exchange' component={ExchangeScreen} />
					<Stack.Screen name='Plots' component={PlotsScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
