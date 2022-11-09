import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ModalSelector from 'react-native-modal-selector-searchable';
import PrimaryButton from '../components/PrimaryButton';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';

const lastFiveDaysDates = [...Array(5).keys()]
	.map((index) => {
		const date = new Date();
		date.setDate(date.getDate() - index - 2);
		return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
			'0' + date.getDate()
		).slice(-2)}`;
	})
	.reverse();
const lastFiveMonthsDates = [...Array(5).keys()]
	.map((index) => {
		const date = new Date();
		date.setDate(date.getDate() - 2);
		return `${date.getFullYear()}-${('0' + (date.getMonth() - index + 1)).slice(
			-2
		)}-${('0' + date.getDate()).slice(-2)}`;
	})
	.reverse();

const PlotsScreen = ({ navigation }) => {
	const [enteredCurrency, setEnteredCurrency] = useState('');
	const [calculatedValues, setCalculatedValues] = useState([0]);
	const [correctLabels, setCorrectLabels] = useState([0]);
	const [tableData, setTableData] = useState([]);

	const currencyHandler = (option) => {
		setEnteredCurrency(option.key);
	};

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
	const data = {
		labels: correctLabels,
		datasets: [
			{
				data: calculatedValues,
			},
		],
	};

	const printPlot = (selectedDate) => {
		if (enteredCurrency === '') {
			Alert.alert('Błędna waluta', 'Wpisz poprawną walutę', [
				{ text: 'Zamknij' },
			]);
			return;
		}
		setCorrectLabels(selectedDate);
		setCalculatedValues([]);
		selectedDate.forEach((date) => {
			calculateValues(date, enteredCurrency.toLocaleLowerCase());
		});
	};

	const chartConfig = {
		backgroundGradientFrom: '#000',
		backgroundGradientFromOpacity: 1,
		backgroundGradientTo: '#000',
		backgroundGradientToOpacity: 1,
		color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
		barPercentage: 0.5,
	};
	const addToList = (data) => {
		const solution = Object.keys(data).map((e) => ({
			key: e,
			label: data[e],
		}));
		return solution;
	};
	useEffect(() => {
		const initialTable = () => {
			const url =
				'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json';
			axios.get(url).then(({ data }) => {
				setTableData([...addToList(data)]);
			});
		};
		initialTable();
	}, []);
	const backToMenuHandler = () => {
		setEnteredCurrency('');
		setCalculatedValues([0]);
		setCorrectLabels([0]);
		navigation.navigate('MainMenu');
	};
	return (
		<View style={styles.cointainer}>
			<Text style={styles.text}>Wykresy</Text>
			<View style={styles.helpScreen}>
				<ModalSelector
					data={tableData}
					initValue='Wybierz walutę!'
					onChange={currencyHandler}
					listType='FLATLIST'
					style={styles.modal}
					searchTextStyle={{ color: '#000', fontSize: 16 }}
					selectStyle={{ color: '#000' }}
					initValueTextStyle={{ color: '#000' }}
					optionTextStyle={{ color: '#000' }}
				/>
			</View>
			<LineChart
				style={styles.chart}
				data={data}
				width={380}
				height={300}
				chartConfig={chartConfig}
			/>
			<View style={styles.helpScreen}>
				<View style={styles.buttonContainer}>
					<PrimaryButton
						style={styles.button}
						onPress={printPlot.bind(this, lastFiveDaysDates)}>
						Dzień
					</PrimaryButton>
					<PrimaryButton
						style={styles.button}
						onPress={printPlot.bind(this, lastFiveMonthsDates)}>
						Miesiąc
					</PrimaryButton>
				</View>
				<PrimaryButton onPress={backToMenuHandler}>Menu główne</PrimaryButton>
			</View>
		</View>
	);
};
export default PlotsScreen;

const styles = StyleSheet.create({
	cointainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	text: {
		marginBottom: 20,
		color: 'black',
		fontSize: 28,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	helpScreen: {
		width: '80%',
	},
	modal: {
		borderRadius: 8,
		borderWidth: 2,
		elevation: 4,
		backgroundColor: '#ccc',
		color: '#000',
	},
	textInput: {
		textTransform: 'uppercase',
		margin: 4,
		padding: 2,
		width: 150,
		borderBottomWidth: 2,
		borderColor: 'white',
		color: 'white',
		fontSize: 18,
	},
	chart: {
		marginTop: 40,
		marginBottom: 20,
		borderRadius: 10,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		width: '40%',
	},
});
