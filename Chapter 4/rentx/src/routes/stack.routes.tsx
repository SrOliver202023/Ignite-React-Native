import React from "react";

import theme from "../styles/theme";
import { createStackNavigator } from "@react-navigation/stack";

import { Splash } from "../screens/Splash";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { Confirmation } from "../screens/Confirmation";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { ThemeProvider } from "styled-components";
import { MyCars } from "../screens/MyCars";
import { SignIn } from "../screens/SignIn";

import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";

const { Navigator, Screen } = createStackNavigator();


export function StackRoutes() {
  return (
    <ThemeProvider theme={theme}>
      <Navigator
        // initialRouteName="Home"
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false }}
      >

        <Screen name="Home" component={Home}
          options={{
            gestureEnabled: false,
          }}

        />
        <Screen name="Splash" component={Splash} />
        <Screen name="SignIn" component={SignIn} />
        <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
        <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
        <Screen name="CarDetails" component={CarDetails} />
        <Screen name="MyCars" component={MyCars} />
        <Screen name="Scheduling" component={Scheduling} />
        <Screen name="Confirmation" component={Confirmation} />
        <Screen name="SchedulingDetails" component={SchedulingDetails} />

      </Navigator>
    </ThemeProvider>
  );
}