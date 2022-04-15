import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./stack.routes";
import theme from "../styles/theme";
import { ThemeProvider } from 'styled-components';

export function Routes() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer >
        <StackRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}