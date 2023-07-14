import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Favourite from "./Favourite";
import { Ionicons } from "@expo/vector-icons";

export const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Favourite") {
            iconName = "ios-list";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: "Home" }} />
      <Tab.Screen name="Favourite" component={Favourite} />
    </Tab.Navigator>
  );
}

export default MyTabs;
