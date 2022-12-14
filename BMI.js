import { React, useState, useMemo, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { MotiText } from "moti";
import URI from "urijs";
import moment from "moment";
import { useQuery } from "react-query";
import Lottie from "lottie-react-native";

const fetchBMI = async (weight, height) => {
	const url = URI("https://mega-fitness-calculator1.p.rapidapi.com/bmi")
		.query({
			weight,
			height,
		})
		.toString();

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"x-rapidapi-host": "mega-fitness-calculator1.p.rapidapi.com",
			"x-rapidapi-key":
				"880421ca89mshdba39f8acbf2fb8p1022a8jsn69f78c022901",
		},
	});

	return response.json();
};

export default function BMI() {
	const [bodyParams, setBodyParams] = useState({
		weight: 0,
		height: 0,
	});

	let bmiQuery = useQuery(["bmi", bodyParams.weight, bodyParams.height], () =>
		fetchBMI(bodyParams.weight, bodyParams.height)
	);

	const onWeightChange = (text) => {
		setBodyParams({
			...bodyParams,
			weight: parseInt(text),
		});
	};

	const onHeightChange = (text) => {
		setBodyParams({
			...bodyParams,
			height: parseInt(text),
		});
	};

	const BMI =
		bodyParams.height && bodyParams.weight
			? bmiQuery?.data?.info?.bmi
			: "-----";

	return (
		<View style={styles.container}>
			<MotiText
				from={{ opacity: 0, translateY: -100 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ type: "timing", duration: 1000 }}
				style={{ fontSize: 30, fontWeight: "bold", color: "green" }}
			>
				Welcome to Mega Fitness Calculator!
			</MotiText>
			<Text style={{ fontSize: 20, fontWeight: "bold" }}>
				Today: {moment().format("MMMM Do YYYY")}
			</Text>
			<TextInput
				placeholder="Enter your weight in kg"
				style={styles.input}
				onChangeText={onWeightChange}
			/>
			<TextInput
				placeholder="Enter your height in cm"
				style={styles.input}
				onChangeText={onHeightChange}
			/>
			<Text style={{ fontSize: 20, fontWeight: "bold" }}>
				Your BMI is: {BMI}
			</Text>

			{BMI !== "-----" && (
				<View>
					{bmiQuery?.data?.info?.bmi < 18.5 && (
						<>
							<Text style={{ fontSize: 20, fontWeight: "bold" }}>
								You are Underweight
							</Text>
						</>
					)}

					{bmiQuery?.data?.info?.bmi >= 18.5 &&
						bmiQuery?.data?.info?.bmi < 24.9 && (
							<>
								<Text
									style={{ fontSize: 20, fontWeight: "bold" }}
								>
									You are Normal
								</Text>
							</>
						)}

					{bmiQuery?.data?.info?.bmi >= 25 &&
						bmiQuery?.data?.info?.bmi < 29.9 && (
							<>
								<Text
									style={{ fontSize: 20, fontWeight: "bold" }}
								>
									You are Overweight
								</Text>
							</>
						)}

					{bmiQuery?.data?.info?.bmi >= 30 &&
						bmiQuery?.data?.info?.bmi < 39.9 && (
							<>
								<Text
									style={{ fontSize: 20, fontWeight: "bold" }}
								>
									You are Obese
								</Text>
							</>
						)}

					{bmiQuery?.data?.info?.bmi > 40 && (
						<>
							<Text style={{ fontSize: 20, fontWeight: "bold" }}>
								You are Morbidly Obese
							</Text>
						</>
					)}
				</View>
			)}
            <View style={styles.lottie}>
						<Lottie
							speed={2}
							loop
							controls
							autoplay
							background="transparent"
							source={require("./assets/61230-smartwatch.json")}
						/>
					</View>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	lottie: {
		height: 300,
		width: "auto",
		alignItems: "stretch",
		justifyContent: "center",
	},
});
