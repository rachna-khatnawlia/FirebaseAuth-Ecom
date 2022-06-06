//import liraries
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Button from '../../../Components/ButtonComponent';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import Input from '../../../Components/Input';
import WrapperContainer from '../../../Components/WrapperContainer';
import navigationStrings from '../../../navigation/navigationStrings';
import colors from '../../../styles/colors';
import { moderateScale, textScale } from '../../../styles/responsiveSize';

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

    const { register } = useContext(AuthContext)
    const { login } = useContext(AuthContext)
    const onLogin = () => {
        login(email, pass)
    }
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
