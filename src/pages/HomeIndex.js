import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./Home/HomePage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationHomeRef } from "../navigator/rootNavigator";
import DashHomePage from "./Dashboard/DashHomePage";

const Stack = createNativeStackNavigator();
function HomeIndex() {
  return (
    <NavigationContainer ref={navigationHomeRef} independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Dashboard" component={DashHomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeIndex;
