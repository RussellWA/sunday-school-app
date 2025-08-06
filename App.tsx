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
import AdminScreen from "./screens/AdminScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { theme } from "./types/Theme";
import ScannerScreen from "./screens/ScannerScreen";

export type RootStackParamList = {
	Login: undefined;
	SignUp: undefined;
	Home: undefined;
	CompleteProfile: undefined;
	AddChildren: undefined;
	Admin: undefined;
	Welcome: undefined;
	Scanner: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
	<GestureHandlerRootView style={{ flex: 1 }}>
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false }}> 
					<Stack.Screen name="Welcome" component={WelcomeScreen}/>
					<Stack.Screen name="Login" component={LoginScreen}/>
					<Stack.Screen name="SignUp" component={SignUpScreen}/>
					<Stack.Screen name="CompleteProfile" component={CompleteProfileScreen}/>
					<Stack.Screen name="Home" component={HomeScreen}/>
					<Stack.Screen name="AddChildren" component={AddChildrenScreen}/>
					<Stack.Screen name="Admin" component={AdminScreen}/>
					<Stack.Screen name="Scanner" component={ScannerScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	</GestureHandlerRootView>
  );
}