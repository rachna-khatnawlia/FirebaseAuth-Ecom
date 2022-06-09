//import liraries
import React, { Component } from 'react';
import { ConfirmOtp, ForgotPassword, Login, OtpLogin, SignUp } from '../Screens';
import navigationStrings from './navigationStrings';

// create a component
const AuthStack = (Stack) => {
    return (
        <>
            <Stack.Screen name={navigationStrings.LOGIN} component={Login} options={{ headerShown: false }} />
            <Stack.Screen name={navigationStrings.SIGNUP} component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name={navigationStrings.FORGOT_PASSWORD} component={ForgotPassword} options={{ headerShown: false }} />
            <Stack.Screen name={navigationStrings.OTP_LOGIN} component={OtpLogin} options={{headerShown:false}}/>
            <Stack.Screen name={navigationStrings.CONFIRM_OTP} component={ConfirmOtp} options={{headerShown:false}}/>

        </>
    );
};

//make this component available to the app
export default AuthStack;
