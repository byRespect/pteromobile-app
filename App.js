import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useSelector } from "react-redux";
import { navigationRef } from "./src/navigator/rootNavigator";
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";
import store from "./src/redux/store";
import Toast from "react-native-toast-message";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import HomeIndex from "./src/pages/HomeIndex";

function AppComp() {
  const { user, loading, error } = useSelector((state) => state.auth);
  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View>
        <Text>ERROR: {error}</Text>
      </View>
    );
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={Object.keys(user).length ? "Home" : "Login"}
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="Home" component={HomeIndex} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Provider store={store}>
        <AppComp />
      </Provider>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#f3f8fe",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
