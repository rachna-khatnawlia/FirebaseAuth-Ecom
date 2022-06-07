//import liraries
import React, { Component } from 'react';
import { ForgotPassword, Login, SignUp } from '../Screens';
import navigationStrings from './navigationStrings';

// create a component
const AuthStack = (Stack) => {
    return (
        <>
            <Stack.Screen name={navigationStrings.LOGIN} component={Login} options={{ headerShown: false }} />
            <Stack.Screen name={navigationStrings.SIGNUP} component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name={navigationStrings.FORGOT_PASSWORD} component={ForgotPassword} options={{ headerShown: false }} />

        </>
    );
};

//make this component available to the app
export default AuthStack;
