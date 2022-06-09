//import liraries
import React, { useContext, useState } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../Components/ButtonComponent';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import GoBack from '../../../Components/goBack';
import Input from '../../../Components/Input';
import WrapperContainer from '../../../Components/WrapperContainer';
import strings from '../../../constants/lang';
import { textScale, moderateScale } from '../../../styles/responsiveSize';


// create a component
const SignUp = ({ navigation }) => {
    const [upDateData, setUpdateData] = useState({
        email: '',
        pass: '',
        cpass: '',
    })
    const { email, pass, cpass } = upDateData;
    const updateState = (data) => setUpdateData(state => ({ ...state, ...data }));
    const onChangeTextResult = (key, value) => {
        console.log(key, value, "key");
        updateState({ [key]: value })
    }

    const { register } = useContext(AuthContext)

    const onSignup = () => {
        if (email == '') {
            showMessage({
                message: "Empty Email..!!",
                type: "danger",
            })
        } else {
            if (pass == '' || cpass == '') {
                showMessage({
                    message: "password should not be empty",
                    type: "danger",
                })
            } else {
                if (pass === cpass) {
                    register(email, pass)
                    showMessage({
                        message: "signup successfull..!!",
                        type: "success",
                    })
                } else {
                    showMessage({
                        message: "passowrd and confirm password must be same",
                        type: "danger",
                    })
                }
            }
        }
    }

    return (
        <WrapperContainer>
            <GoBack headerText="SignUp " />
            <ScrollView style={{ flex: 1, paddingHorizontal: moderateScale(15) }}>
                <Text style={styles.heading}>{strings.CR_NW_ACCOUNT_TEXT}</Text>
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
                <Input
                    placeholder="Confirm Password"
                    pass={true}
                    value={cpass}
                    onChangeText={(value) => onChangeTextResult('cpass', value)}
                />
                {/* <Text>Data is {email}, {pass}, {cpass}</Text> */}
            </ScrollView>
            <KeyboardAvoidingView enabled={true} behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
                <View style={{paddingHorizontal:moderateScale(15)}}>
                    <Button
                        buttonText='SignUp'
                        onPress={onSignup}
                    />
                </View>
            </KeyboardAvoidingView>
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
        marginBottom: moderateScale(15)
    },
    heading: {
        fontSize: textScale(17),
        // textAlign:'justify',
        paddingBottom: moderateScale(20),
        paddingTop: moderateScale(5)
    }
});

//make this component available to the app
export default SignUp;
