import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { CurrienciesContext } from '../store/curriencies-context';
const FavItem = ({ title, id, value }) => {
	const currenciesCtx = useContext(CurrienciesContext);
	const deleteCurrrencyHandler = () => {
		currenciesCtx.deleteCurrency(id);
	};
	return (
		<View style={styles.inputContainer}>
			<Ionicons
				name='trash'
				color='purple'
				size={32}
				onPress={deleteCurrrencyHandler}
			/>
			<View style={styles.innerContainer}>
				<View style={styles.boxTitle}>
					<Text style={styles.title}>{title}</Text>
				</View>
				<View style={styles.valueContainer}>
					<Text style={styles.value}>Wartość</Text>
					<Text style={styles.value}>{value.toFixed(2)}</Text>
				</View>
			</View>
		</View>
	);
};

export default FavItem;

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
		marginVertical: 10,
		borderWidth: 2,
		borderRadius: 8,
	},
	innerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '85%',
	},
	boxTitle: {
		width: '80%',
	},
	title: {
		fontSize: 20,
	},
	valueContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	value: {
		fontSize: 14,
	},
});
