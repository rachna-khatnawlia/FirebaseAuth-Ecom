//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Button from '../../../Components/ButtonComponent';
import Input from '../../../Components/Input';
import WrapperContainer from '../../../Components/WrapperContainer';
import navigationStrings from '../../../navigation/navigationStrings';
import colors from '../../../styles/colors';
import { moderateScale, textScale } from '../../../styles/responsiveSize';

// create a component
const Login = ({ navigation }) => {
    return (
        <>
            <WrapperContainer>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Input
                        placeholder="Email"
                    />
                    <Input
                        placeholder="Password"
                        pass={true}
                    />
                    <Button
                        buttonText='Login'
                    />
                    <TouchableOpacity>
                        <Text style={styles.forgot}>Forgot Password. ?</Text>
                    </TouchableOpacity>
                    <Button
                        buttonText='Login With Google'
                    />
                    <Button
                        buttonText='Login With Facebook'
                    />
                    <Button
                        buttonText='Login With Apple'
                    />
                    <View style={styles.signupNow}>
                        <Text style={{ fontSize: textScale(13) }}>Don't Have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.SIGNUP)}>
                            <Text style={{ color: colors.themeredColor, fontSize: textScale(13) }}>SignUp Now</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </WrapperContainer>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    forgot: {
        textAlign: 'center',
        marginVertical: moderateScale(8),
        fontSize: textScale(13)
    },
    signupNow: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

//make this component available to the app
export default Login;
