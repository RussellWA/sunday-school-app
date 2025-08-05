import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Dimensions, Image, Platform, StatusBar, View } from "react-native";
import { Button, Text } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
    const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 44;
    
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#fff" }}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <Image 
                source={require("../assets/bnw.png")}
                resizeMode="cover"
                style={{
                    width: "100%",
                    height: 250,
                }}
            />
            <Text variant="titleLarge">Welcome to the Gilgal Kids Connect!</Text>
            <Button 
                onPress={() => navigation.navigate('Login')}
                mode="contained" 
                style={{ marginVertical: 10, width: '75%' }}
            >Login</Button>
            <Button 
                onPress={() => navigation.navigate('SignUp')}
                mode="outlined" 
                style={{ marginVertical: 10, width: '75%' }}
            >Sign Up</Button>
        </View>
    );
};

export default WelcomeScreen;