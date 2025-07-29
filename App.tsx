import React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import CompleteProfileScreen from "./screens/CompleteProfileScreen";

export type RootStackParamList = {
	Login: undefined;
	SignUp: undefined;
	Home: undefined;
	CompleteProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
		<NavigationContainer>
			<Stack.Navigator initialRouteName="SignUp">
				<Stack.Screen name="Login" component={LoginScreen}/>
				<Stack.Screen name="SignUp" component={SignUpScreen}/>
				<Stack.Screen name="CompleteProfile" component={CompleteProfileScreen}/>
				{/* <Stack.Screen name="Home" component={undefined}/> */}
			</Stack.Navigator>
		</NavigationContainer>
    </PaperProvider>
  );
}