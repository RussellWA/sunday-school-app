import React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import CompleteProfileScreen from "./screens/CompleteProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChildrenScreen from "./screens/AddChildScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export type RootStackParamList = {
	Login: undefined;
	SignUp: undefined;
	Home: undefined;
	CompleteProfile: undefined;
	AddChildren: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
	<GestureHandlerRootView style={{ flex: 1 }}>
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Login" component={LoginScreen}/>
				<Stack.Screen name="SignUp" component={SignUpScreen}/>
				<Stack.Screen name="CompleteProfile" component={CompleteProfileScreen}/>
				<Stack.Screen name="Home" component={HomeScreen}/>
				<Stack.Screen name="AddChildren" component={AddChildrenScreen}/>
			</Stack.Navigator>
		</NavigationContainer>
	</GestureHandlerRootView>
  );
}