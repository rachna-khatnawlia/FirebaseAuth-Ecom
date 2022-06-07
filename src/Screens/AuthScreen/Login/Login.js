//import liraries
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Button from '../../../Components/ButtonComponent';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import Input from '../../../Components/Input';
import WrapperContainer from '../../../Components/WrapperContainer';
import navigationStrings from '../../../navigation/navigationStrings';
import colors from '../../../styles/colors';
import { moderateScale, textScale } from '../../../styles/responsiveSize';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// create a component
const Login = ({ navigation }) => {
    const [upDateData, setUpdateData] = useState({
        email: '',
        pass: '',
    })
    const { email, pass } = upDateData;
    const updateState = (data) => setUpdateData(state => ({ ...state, ...data }));
    const onChangeTextResult = (key, value) => {
        console.log(key, value, "key");
        updateState({ [key]: value })
    }

    const { login, googleLogin, fbLogin } = useContext(AuthContext)
    const onLogin = () => {
        login(email, pass)
    }
    useEffect(() => {
        GoogleSignin.configure({
            // webClientId: '211994185769-2ejt0jnq4b7ieu4idik8jci1lli75tr7.apps.googleusercontent.com',
            iosClientId: '211994185769-gcaftabq1tta5qjqf39s2n2d4a845n0u.apps.googleusercontent.com',
            webClientId: Platform.OS === 'ios' ? '211994185769-gcaftabq1tta5qjqf39s2n2d4a845n0u.apps.googleusercontent.com' : '211994185769-2ejt0jnq4b7ieu4idik8jci1lli75tr7.apps.googleusercontent.com'
        })
    }, [])
    return (
        <>
            <WrapperContainer>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Input
                        placeholder="Email"
                        value={email}
                        onChangeText={(value) => onChangeTextResult('email', value)}
                    />
                    <Input
                        placeholder="Password"
                        pass={true}
                        value={pass}
                        onChangeText={(value) => onChangeTextResult('pass', value)}
                    />
                    <Button
                        buttonText='Login'
                        onPress={onLogin}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.FORGOT_PASSWORD)}>
                        <Text style={styles.forgot}>Forgot Password. ?</Text>
                    </TouchableOpacity>
                    <Button
                        buttonText='Login With Google'
                        onPress={() => googleLogin()}
                    />
                    <Button
                        buttonText='Login With Facebook'
                        onPress={() => fbLogin()}
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
