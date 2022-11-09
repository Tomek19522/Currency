import { BackHandler, View, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
const MainMenu = ({ navigation }) => {
	const goToExchange = () => {
		navigation.navigate('Exchange');
	};
	const goToPlot = () => {
		navigation.navigate('Plots');
	};
	const closeApp = () => {
		BackHandler.exitApp();
	};
	return (
		<>
			<View style={styles.container}>
				<PrimaryButton onPress={goToExchange}>Wymiana</PrimaryButton>
				<PrimaryButton onPress={goToPlot}>Wykresy</PrimaryButton>
				<PrimaryButton onPress={closeApp}>Wyjście</PrimaryButton>
			</View>
		</>
	);
};

export default MainMenu;

const styles = StyleSheet.create({
	container: {
		width: '80%',
		flex: 1,
		justifyContent: 'center',
		marginLeft: '10%',
	},
});
