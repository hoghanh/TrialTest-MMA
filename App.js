import { StatusBar } from "expo-status-bar";
import Navigation from "./navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyTabs from "./components/MyTabs";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
