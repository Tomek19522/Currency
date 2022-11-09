import { View, Text, StyleSheet, Pressable } from 'react-native';

const PrimaryButton = ({ children, onPress, style }) => {
	return (
		<View style={[styles.buttonOuterCointainer, style]}>
			<Pressable
				style={styles.buttonInnerCointainer}
				onPress={onPress}
				android_ripple={{ color: 'black' }}>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</View>
	);
};
export default PrimaryButton;

const styles = StyleSheet.create({
	buttonOuterCointainer: {
		margin: 15,
		borderWidth: 2,
		borderColor: 'black',
	},
	buttonInnerCointainer: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		elevation: 2,
	},
	buttonText: {
		fontSize: 18,
		color: 'black',
		textAlign: 'center',
	},
});
