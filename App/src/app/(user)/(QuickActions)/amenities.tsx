import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native';

const Amenities: React.FC = () => {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />
			<View style={styles.content}>
				<Text style={styles.title}>Amenities</Text>
				<Text style={styles.subtitle}>List and manage community amenities here.</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	content: {
		flex: 1,
		padding: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 28,
		fontWeight: '600',
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: '#666',
		textAlign: 'center',
	},
});

export default Amenities;
