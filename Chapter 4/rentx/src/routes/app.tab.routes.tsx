import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Profile } from "../screens/Profile";
import { MyCars } from "../screens/MyCars";
import { AppStackRoutes } from "./app.stack.routes";

import HomeSvg from '../../src/assets/home.svg';
import PeopleSvg from '../../src/assets/people.svg';
import CarSvg from '../../src/assets/car.svg';
import { useTheme } from "styled-components";
import { Platform } from "react-native";


const { Navigator, Screen } = createBottomTabNavigator();
export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary
        }
      }}
    >

      <Screen name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          )
        }} />

      <Screen name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          )
        }} />

      <Screen name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg width={24} height={24} fill={color} />
          )
        }} />


    </Navigator>
  );
}