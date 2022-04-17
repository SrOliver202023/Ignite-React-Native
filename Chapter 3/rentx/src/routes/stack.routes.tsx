import React from "react";

import theme from "../styles/theme";
import { createStackNavigator, StackHeaderProps } from "@react-navigation/stack";


import { Splash } from "../screens/Splash";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingComplete } from "../screens/SchedulingComplete";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { ThemeProvider } from "styled-components";
import { MyCars } from "../screens/MyCars";

const { Navigator, Screen } = createStackNavigator();


export function StackRoutes() {
  return (
    <ThemeProvider theme={theme}>
      <Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >

        <Screen name="Home" component={Home} />
        <Screen name="Splash" component={Splash} />
        <Screen name="CarDetails" component={CarDetails} />
        <Screen name="MyCars" component={MyCars} />
        <Screen name="Scheduling" component={Scheduling} />
        <Screen name="SchedulingComplete" component={SchedulingComplete} />
        <Screen name="SchedulingDetails" component={SchedulingDetails} />

      </Navigator>
    </ThemeProvider>
  );
}