import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import PrimaryButton from '../components/PrimaryButton';
import ModalSelector from 'react-native-modal-selector-searchable';

const ExchangeScreen = ({ navigation }) => {
	const [enteredFirstCurrency, setEnteredFirstCurrency] = useState();
	const [enteredSecondCurrency, setEnteredSecondCurrency] = useState();
	const [enteredValueFirstCurrency, setEnteredValueFirstCurrency] = useState();
	const [enteredValueSecondCurrency, setEnteredValueSecondCurrency] =
		useState();
	const [tableData, setTableData] = useState([]);

	const firstCurrencyHandler = (option) => {
		setEnteredFirstCurrency(option.key);
	};
	const firstValueCurrencyHandler = (enteredText) => {
		setEnteredValueFirstCurrency(enteredText);
	};
	const secondCurrencyHandler = (option) => {
		setEnteredSecondCurrency(option.key);
	};
	const caculateSecondValueCurrency = () => {
		if (enteredValueFirstCurrency === undefined) {
			Alert.alert('Za mało pieniędzy', 'Wpisz liczbę większą od 0', [
				{ text: 'Zamknij' },
			]);
			return;
		}
		if (
			enteredFirstCurrency === undefined ||
			enteredSecondCurrency === undefined
		) {
			Alert.alert('Wybierz walute', 'Wypełnij pola z walutami', [
				{ text: 'Zamknij' },
			]);
			return;
		}
		axios
			.get(
				`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${enteredFirstCurrency.toLocaleLowerCase()}/${enteredSecondCurrency.toLocaleLowerCase()}.json`
			)
			.then(({ data }) => {
				const newNumber = (
					parseInt(enteredValueFirstCurrency) *
					data[`${enteredSecondCurrency.toLocaleLowerCase()}`]
				).toFixed(2);
				setEnteredValueSecondCurrency(newNumber);
			})
			.catch(() => {
				Alert.alert('Błędna waluta', 'Wpisz poprawną walutę', [
					{ text: 'Zamknij' },
				]);
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
	const resetHandler = () => {
		setEnteredFirstCurrency();
		setEnteredSecondCurrency();
		setEnteredValueFirstCurrency();
		setEnteredValueSecondCurrency();
	};

	const changeHandler = () => {
		const temp = enteredFirstCurrency;
		setEnteredFirstCurrency(enteredSecondCurrency);
		setEnteredSecondCurrency(temp);
	};
	const pressHandler = () => {
		resetHandler();
		navigation.navigate('MainMenu');
	};
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Wymiana walut</Text>
			<View style={styles.innerContainer}>
				<ModalSelector
					data={tableData}
					initValue='Wybierz pierwszą walutę!'
					onChange={firstCurrencyHandler}
					listType='FLATLIST'
					style={styles.modal}
					selectedKey={enteredFirstCurrency}
					searchTextStyle={{ color: '#000', fontSize: 16 }}
					selectStyle={{ color: '#000' }}
					initValueTextStyle={{ color: '#000' }}
					optionTextStyle={{ color: '#000' }}
				/>

				<ModalSelector
					data={tableData}
					initValue='Wybierz drugą walutę!'
					onChange={secondCurrencyHandler}
					listType='FLATLIST'
					selectedKey={enteredSecondCurrency}
					style={styles.modal}
					searchTextStyle={{ color: '#000', fontSize: 16 }}
					selectStyle={{ color: '#000' }}
					initValueTextStyle={{ color: '#000' }}
					optionTextStyle={{ color: '#000' }}
				/>
				<View style={styles.numberCointainer}>
					<Text style={styles.numberText}>Podaj liczbę pieniędzy:</Text>
					<TextInput
						style={styles.textInput}
						keyboardType='number-pad'
						onChangeText={firstValueCurrencyHandler}
						value={enteredValueFirstCurrency}
					/>
				</View>
				<View style={styles.numberCointainer}>
					<Text style={styles.numberText}>
						Wynosi: {enteredValueSecondCurrency}
					</Text>
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<PrimaryButton
					style={styles.button}
					onPress={caculateSecondValueCurrency}>
					Oblicz
				</PrimaryButton>
				<PrimaryButton style={styles.button} onPress={resetHandler}>
					Reset
				</PrimaryButton>
				<PrimaryButton style={styles.button} onPress={changeHandler}>
					Zamień
				</PrimaryButton>
			</View>
			<PrimaryButton style={styles.menu} onPress={pressHandler}>
				Menu główne
			</PrimaryButton>
		</View>
	);
};
export default ExchangeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	innerContainer: {
		width: '80%',
		height: '50%',
		justifyContent: 'space-evenly',
	},
	modal: {
		borderRadius: 8,
		borderWidth: 2,
		elevation: 4,
		backgroundColor: '#ccc',
		color: '#000',
	},
	numberCointainer: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 4,
	},
	numberText: {
		color: 'black',
		fontSize: 20,
	},
	text: {
		marginBottom: 20,
		color: 'black',
		fontSize: 28,
		fontWeight: 'bold',
	},
	textInput: {
		textTransform: 'uppercase',
		margin: 4,
		padding: 2,
		width: 150,
		borderBottomWidth: 2,
		borderColor: 'black',
		color: 'black',
		fontSize: 18,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
	},
	button: {
		width: '25%',
	},
	menu: {
		width: '90%',
	},
});
