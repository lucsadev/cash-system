import { Stack } from "expo-router/stack";
import { PaperProvider } from "react-native-paper";
import { ToastProvider } from "react-native-toast-notifications";
import { addEventListener, useNetInfo } from "@react-native-community/netinfo";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "../theme";
import { Text, View } from "react-native";
import * as SplashScreen from 'expo-splash-screen';

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isConnected } = useNetInfo();  

    if (!isConnected) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Icon name="wifi-strength-alert-outline" size={32} color="red" />
        <Text style={{ textAlign: "center", fontSize: 28, fontWeight: "bold",color: "red" }}>No hay red</Text>
      </View>   
    );
  }


  return (
    <PaperProvider theme={theme}>
      <ToastProvider
        duration={1000}
        textStyle={{ fontSize: 20, color: "#000" }}
        successColor="#22c55eca"
        dangerColor="#ef4444ca"
        normalColor="#0369a177"
        offsetBottom={60}
        swipeEnabled={true}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen name="authScreen" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ToastProvider>
    </PaperProvider>
  );
}
