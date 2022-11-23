import { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import { CurrienciesContext } from '../store/curriencies-context';
const SimplePlotScreen = ({ navigation, route }) => {
	const [calculatedValues, setCalculatedValues] = useState([0]);
	const seletedValues = route.params;

	const currenciesCtx = useContext(CurrienciesContext);

	useEffect(() => {
		const calculateValues = (date, name) => {
			axios
				.get(
					`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/${name}/pln.json`
				)
				.then(({ data }) => {
					const val = data['pln'];
					setCalculatedValues((prev) => [...prev, val]);
				})
				.catch((error) => console.log(error));
		};
		setCalculatedValues([]);
		seletedValues.time.forEach((date) => {
			calculateValues(date, seletedValues.id.toLocaleLowerCase());
		});
	}, []);

	const data = {
		labels: seletedValues.time,
		datasets: [
			{
				data: calculatedValues,
			},
		],
	};
	const chartConfig = {
		backgroundGradientFrom: '#000',
		backgroundGradientFromOpacity: 1,
		backgroundGradientTo: '#000',
		backgroundGradientToOpacity: 1,
		color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
		barPercentage: 0.5,
	};
	const goBack = () => {
		navigation.navigate('Plots');
	};

	const headerButtonPressHandler = () => {
		currenciesCtx.addCurrency({
			id: seletedValues.id,
			title: seletedValues.title,
			value: calculatedValues[4],
		});
		Alert.alert(
			'Dodano do ulubionych!',
			'Możesz zobaczyć w odpowiedniej zakładce',
			[{ text: 'Zamknij' }]
		);
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Ionicons
					name='add'
					color='black'
					size={24}
					onPress={headerButtonPressHandler}
				/>
			),
			title: seletedValues.title,
		});
	}, [navigation, headerButtonPressHandler]);
	return (
		<View style={styles.container}>
			<LineChart
				style={styles.chart}
				data={data}
				width={380}
				height={300}
				chartConfig={chartConfig}
			/>
			<PrimaryButton onPress={goBack} style={styles.button}>
				Back
			</PrimaryButton>
		</View>
	);
};
export default SimplePlotScreen;

const styles = StyleSheet.create({
	container: {
		padding: 6,
		alignItems: 'center',
	},
	chart: {
		marginTop: 60,
		marginBottom: 30,
		borderRadius: 10,
	},
	button: {
		width: '50%',
	},
});
