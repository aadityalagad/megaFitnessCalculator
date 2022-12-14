import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { QueryClient, QueryClientProvider } from "react-query";

import BMI from "./BMI";

export default function App() {
	const queryClient = new QueryClient();
	return (
		<View style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <BMI />
      </QueryClientProvider>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
    paddingTop: 100,
	},
});
