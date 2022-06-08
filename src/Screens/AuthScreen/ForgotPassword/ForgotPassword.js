//import liraries
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Button from '../../../Components/ButtonComponent';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import GoBack from '../../../Components/goBack';
import Input from '../../../Components/Input';
import WrapperContainer from '../../../Components/WrapperContainer';
import strings from '../../../constants/lang';
import { moderateScale, textScale } from '../../../styles/responsiveSize';

// create a component
const ForgotPassword = ({ navigation }) => {
    const { forgotPass, sentEmail } = useContext(AuthContext)
    useEffect(() => {
        console.log(sentEmail);
    }, [])
    const [upDateData, setUpdateData] = useState({
        email: '',
    })
    const { email } = upDateData;
    const updateState = (data) => setUpdateData(state => ({ ...state, ...data }));
    const onChangeTextResult = (key, value) => {
        updateState({ [key]: value })
    }

    function _onResetPassword() {
        forgotPass(email)
        console.log(sentEmail);
    }

    return (
        <WrapperContainer>
            <GoBack headerText={strings.FORGET_PASSWORD} />
            <ScrollView style={{ flex: 1 }}>
                <Text style={styles.heading}>{strings.RESET_PASSWORD_TXT}</Text>

                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={(value) => onChangeTextResult('email', value)}
                />
                <Text>{email}</Text>
            </ScrollView>
            <KeyboardAvoidingView enabled={true} behavior={Platform.OS == 'android' ? 'height' : 'padding'}>

                <Button
                    buttonText='Send Reset Link Via Email'
                    onPress={_onResetPassword}
                />
            </KeyboardAvoidingView>

        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    heading: {
        fontSize: textScale(17),
        paddingHorizontal: moderateScale(15),
        paddingBottom: moderateScale(20),
        paddingTop: moderateScale(5),
        lineHeight: moderateScale(30)
    }
});

//make this component available to the app
export default ForgotPassword;
