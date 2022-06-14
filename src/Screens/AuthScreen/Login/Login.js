//import liraries
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Button from '../../../Components/ButtonComponent';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import Input from '../../../Components/Input';
import WrapperContainer from '../../../Components/WrapperContainer';
import navigationStrings from '../../../navigation/navigationStrings';
import colors from '../../../styles/colors';
import { moderateScale, textScale } from '../../../styles/responsiveSize';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import strings from '../../../constants/lang';

// create a component
const Login = ({ navigation }) => {
    const [upDateData, setUpdateData] = useState({
        email: '',
        pass: '',
        modalVisible: false
    })
    const { email, pass, modalVisible } = upDateData;
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
                <TouchableOpacity style={styles.langContainer}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}>

                        <Text style={styles.lang}>Change Language</Text>
                    </Modal>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: moderateScale(15) }}>
                    <Input
                        placeholder={strings.EMAIL}
                        value={email}
                        onChangeText={(value) => onChangeTextResult('email', value)}
                    />
                    <Input
                        placeholder={strings.PASSWORD}
                        pass={true}
                        value={pass}
                        onChangeText={(value) => onChangeTextResult('pass', value)}
                    />
                    <Button
                        buttonText={strings.LOGIN}
                        onPress={onLogin}
                    />
                    <View style={styles.phoneLoginRow}>
                        <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.OTP_LOGIN)}>
                            <Text style={styles.forgot}>{strings.PHONE_LOGIN}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.FORGOT_PASSWORD)}>
                            <Text style={[styles.forgot]}>{strings.FORGET_PASS}</Text>
                        </TouchableOpacity>
                    </View>


                    <Button
                        buttonText={strings.GOOGLE_LOGIN}
                        onPress={() => googleLogin()}
                    />
                    <Button
                        buttonText={strings.FB_LOGIN}
                        onPress={() => fbLogin()}
                    />
                    <Button
                        buttonText={strings.APPLE_LOGIN}
                    />

                    <View style={styles.signupNow}>
                        <Text style={{ fontSize: textScale(13.5) }}>{strings.NO_ACCOUNT}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.SIGNUP)}>
                            <Text style={{ color: colors.themeredColor, fontSize: textScale(14) }}>{strings.SIGNUP_NOW}</Text>
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
        fontSize: textScale(13.5),
        color: colors.themeredColor,
        fontWeight: '400'
    },
    signupNow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    phoneLoginRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    langContainer: {
        paddingHorizontal: moderateScale(15)
    },
    lang: {
        textAlign: 'right',
        fontSize: textScale(14),
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default Login;
