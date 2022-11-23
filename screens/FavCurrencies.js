import { useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import FavItem from '../components/FavItem';
import { CurrienciesContext } from '../store/curriencies-context';

const renderFavItem = ({ item }) => {
	return <FavItem title={item.title} id={item.id} value={item.value} />;
};

const FavCurriencies = () => {
	const currenciesCtx = useContext(CurrienciesContext);
	return (
		<View style={styles.container}>
			<FlatList
				data={currenciesCtx.curriencies}
				keyExtractor={(item) => item.id}
				renderItem={renderFavItem}
			/>
		</View>
	);
};
export default FavCurriencies;

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
});
