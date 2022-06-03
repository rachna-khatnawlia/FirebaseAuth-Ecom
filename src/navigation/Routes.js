import React from "react";

import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    false ? MainStack(Stack) : AuthStack(Stack)
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;