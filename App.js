import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainMenu from './screens/MainMenu';
import ExchangeScreen from './screens/ExchangeScreen';
import PlotsScreen from './screens/PlotsScreen';
import SimplePlotScreen from './screens/SimplePlotScreen';
import FavCurriencies from './screens/FavCurrencies';
import CurrienciesContextProvider from './store/curriencies-context';
export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<>
			<StatusBar style='dark' />
			<CurrienciesContextProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name='MainMenu' component={MainMenu} />
						<Stack.Screen name='Exchange' component={ExchangeScreen} />
						<Stack.Screen name='Plots' component={PlotsScreen} />
						<Stack.Screen name='FavCurriences' component={FavCurriencies} />
						<Stack.Screen name='SimplePlot' component={SimplePlotScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</CurrienciesContextProvider>
		</>
	);
}
