//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../../../Components/ButtonComponent';
import Input from '../../../Components/Input';
import WrapperContainer from '../../../Components/WrapperContainer';
import navigationStrings from '../../../navigation/navigationStrings';
import colors from '../../../styles/colors';
import { textScale, moderateScale, moderateScaleVertical, } from '../../../styles/responsiveSize';


// create a component
const SignUp = ({navigation}) => {
    return (
        <WrapperContainer>
           <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Input
                        placeholder="Email"

                    />
                    <Input
                        placeholder="Password"
                        pass={true}
                    />
                    <Input
                        placeholder="Confirm Password"
                        pass={true}
                    />
                    <Button
                        buttonText='SignUp'
                    />
                     <View style={styles.signupNow}>
                        <Text style={{ fontSize: textScale(13) }}>Already Have an account? </Text>
                        <TouchableOpacity onPress={()=>navigation.navigate(navigationStrings.LOGIN)}>
                            <Text style={{ color: colors.themeredColor, fontSize: textScale(13) }}>Login Now</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Button
                        buttonText='Login With Google'
                    />
                    <Button
                        buttonText='Login With Facebook'
                    />
                    <Button
                        buttonText='Login With Apple'
                    /> */}
                   

                </View>
        </WrapperContainer>
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
        justifyContent: 'center',
        marginBottom:moderateScale(15)
    }
});

//make this component available to the app
export default SignUp;
