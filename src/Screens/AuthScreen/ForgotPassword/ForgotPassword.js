//import liraries
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../../../Components/ButtonComponent';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import Input from '../../../Components/Input';
;
import WrapperContainer from '../../../Components/WrapperContainer';
import colors from '../../../styles/colors';
import { textScale } from '../../../styles/responsiveSize';

// create a component
const ForgotPassword = ({ navigation }) => {
    const { forgotPass, sentEmail } = useContext(AuthContext)
    useEffect(()=>{
        console.log(sentEmail);
    },[])
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
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={(value) => onChangeTextResult('email', value)}
                />
                <Text>{email}</Text>
                <Button
                    buttonText='Send Reset Link Via Email'
                    onPress={_onResetPassword}
                />

            </View>

        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({

});

//make this component available to the app
export default ForgotPassword;
