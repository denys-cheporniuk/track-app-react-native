import React, {useContext, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { FontAwesome } from "@expo/vector-icons";

import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";

import ProfileScreen from "./src/screens/ProfileScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TrackListFlow = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TracksList" component={TrackListScreen} />
    <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
  </Stack.Navigator>
);

const MainFlow = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: () => {
        switch (route.name) {
          case 'Tracks':
            return <FontAwesome name="th-list" size={20} />
          case 'Add Track':
            return <FontAwesome name="plus" size={20} />
          case 'Profile':
            return <FontAwesome name="gear" size={20} />
          default:
            return ''
        }
      },
    })}
  >
    <Tab.Screen name="Tracks" component={TrackListFlow} />
    <Tab.Screen name="Add Track" component={TrackCreateScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const LoginFlow = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
  </Stack.Navigator>
);

const App = () => {
  const { state } = useContext(AuthContext);

  if (state.isLoading) {
    return (
      <ResolveAuthScreen />
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {state.token ? (
          <Stack.Screen name="MainFlow" component={MainFlow} />
        ) : (
          <Stack.Screen name="LoginFlow" component={LoginFlow} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => (
  <TrackProvider>
    <LocationProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LocationProvider>
  </TrackProvider>
);
