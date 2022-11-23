import { StyleSheet } from 'react-native';
import ModalSelector from 'react-native-modal-selector-searchable';
const Selector = ({ tableData, onChange, initialValue, enteredValue }) => {
	return (
		<ModalSelector
			data={tableData}
			initValue={initialValue}
			onChange={onChange}
			listType='FLATLIST'
			style={styles.modal}
			selectedKey={enteredValue}
			searchTextStyle={{ color: '#000', fontSize: 16 }}
			selectStyle={{ color: '#000' }}
			initValueTextStyle={{ color: '#000' }}
			optionTextStyle={{ color: '#000' }}
		/>
	);
};
export default Selector;

const styles = StyleSheet.create({
	modal: {
		borderRadius: 8,
		borderWidth: 2,
		elevation: 4,
		backgroundColor: '#ccc',
		color: '#000',
	},
});
