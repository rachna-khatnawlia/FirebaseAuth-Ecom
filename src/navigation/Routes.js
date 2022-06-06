import React, { useState, useEffect, useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import auth from '@react-native-firebase/auth';
import { AuthContext } from "../Components/FirebaseAuthProvider";

import MainStack from "./MainStack";
import AuthStack from "./AuthStack";

const Stack = createStackNavigator();

const Routes = () => {
    const { user, setUser } = useContext(AuthContext)
    const [initializing, setinitializing] = useState(true)

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setinitializing(false)
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? MainStack(Stack) : AuthStack(Stack)}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;