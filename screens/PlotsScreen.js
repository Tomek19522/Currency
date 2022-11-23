import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import axios from 'axios';
import Selector from '../components/Selector';

// const lastFiveDaysDates = [...Array(5).keys()]
// 	.map((index) => {
// 		const date = new Date();
// 		date.setDate(date.getDate() - index - 2);
// 		return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
// 			'0' + date.getDate()
// 		).slice(-2)}`;
// 	})
// 	.reverse();
// const lastFiveMonthsDates = [...Array(5).keys()]
// 	.map((index) => {
// 		const date = new Date();
// 		date.setDate(date.getDate() - 2);
// 		return `${date.getFullYear()}-${('0' + (date.getMonth() - index)).slice(
// 			-2
// 		)}-${('0' + date.getDate()).slice(-2)}`;
// 	})
// 	.reverse();

const staticLastFiveDays = [
	'2022-10-26',
	'2022-10-27',
	'2022-10-28',
	'2022-10-29',
	'2022-10-30',
];
const staticLastFiveMonths = [
	'2022-06-30',
	'2022-07-30',
	'2022-08-30',
	'2022-09-30',
	'2022-10-30',
];

const PlotsScreen = ({ navigation }) => {
	const [enteredCurrency, setEnteredCurrency] = useState('');
	const [enteredCurrencyTitle, setEnteredCurrencyTitle] = useState('');
	const [tableData, setTableData] = useState([]);

	const currencyHandler = (option) => {
		setEnteredCurrency(option.key);
		setEnteredCurrencyTitle(option.label);
	};
	const selectDays = () => {
		if (enteredCurrency === '') {
			Alert.alert('Błędna waluta', 'Wpisz poprawną walutę', [
				{ text: 'Zamknij' },
			]);
			return;
		}
		navigation.navigate('SimplePlot', {
			time: staticLastFiveDays,
			id: enteredCurrency,
			title: enteredCurrencyTitle,
		});
	};
	const selectMonths = () => {
		if (enteredCurrency === '') {
			Alert.alert('Błędna waluta', 'Wpisz poprawną walutę', [
				{ text: 'Zamknij' },
			]);
			return;
		}
		navigation.navigate('SimplePlot', {
			time: staticLastFiveMonths,
			id: enteredCurrency,
			title: enteredCurrencyTitle,
		});
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
		setEnteredCurrencyTitle('');
		navigation.navigate('MainMenu');
	};
	return (
		<View style={styles.cointainer}>
			<Text style={styles.text}>Wykresy</Text>
			<View style={styles.helpScreen}>
				<Selector
					tableData={tableData}
					initialValue='Wybierz walutę!'
					onChange={currencyHandler}
					enteredValue={enteredCurrency}
				/>
			</View>
			<View style={[styles.helpScreen, styles.helpScreenMargin]}>
				<View style={styles.buttonContainer}>
					<PrimaryButton style={styles.button} onPress={selectDays}>
						Dzień
					</PrimaryButton>
					<PrimaryButton style={styles.button} onPress={selectMonths}>
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
		marginTop: 20,
		width: '80%',
	},
	helpScreenMargin: {
		marginTop: 30,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		width: '40%',
	},
});
