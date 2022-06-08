//import liraries
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Button from '../../../Components/ButtonComponent';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import Input from '../../../Components/Input';
import WrapperContainer from '../../../Components/WrapperContainer';
import navigationStrings from '../../../navigation/navigationStrings';
import colors from '../../../styles/colors';
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
                <Input
                    placeholder="Confirm Password"
                    pass={true}
                    value={cpass}
                    onChangeText={(value) => onChangeTextResult('cpass', value)}
                />
                {/* <Text>Data is {email}, {pass}, {cpass}</Text> */}
                <Button
                    buttonText='SignUp'
                    onPress={onSignup}
                />
                <View style={styles.signupNow}>
                    <Text style={{ fontSize: textScale(13) }}>Already Have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.LOGIN)}>
                        <Text style={{ color: colors.themeredColor, fontSize: textScale(13) }}>Login Now</Text>
                    </TouchableOpacity>
                </View>

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
        marginBottom: moderateScale(15)
    }
});

//make this component available to the app
export default SignUp;
