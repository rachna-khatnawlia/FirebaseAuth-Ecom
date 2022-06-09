//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Button from '../../../Components/ButtonComponent';
import GoBack from '../../../Components/goBack';
import WrapperContainer from '../../../Components/WrapperContainer';
import colors from '../../../styles/colors';
import { moderateScale, moderateScaleVertical, textScale } from '../../../styles/responsiveSize';

// create a component
const ConfirmOtp = () => {
    const [code, setCode] = useState();

    return (
        <>
            <WrapperContainer>
                <GoBack headerText="OTP" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <View style={{}}>
                        <Text style={styles.showNo}>{strings.SEND_OTP} {phoneCode}  {phoneNumber}</Text>
                        <Text style={styles.editNo}>{strings.EDIT_OTP_NO}</Text>
                    </View> */}
                    <SmoothPinCodeInput
                        value={code}
                        onTextChange={code => setCode(code)}
                        cellSize={55}
                        codeLength={6}
                        cellStyle={{
                            borderRadius: moderateScale(5),
                            marginLeft: moderateScale(5),
                            backgroundColor: 'white',
                            borderWidth: 1
                        }}
                    />
                </View>
                <KeyboardAvoidingView enabled={true} behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
                    <View style={{ paddingHorizontal: moderateScale(15) }}>
                        <Button
                            buttonText='SignUp'
                        // onPress={onSignup}
                        />
                    </View>
                </KeyboardAvoidingView>
            </WrapperContainer>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    showNo: {
        fontSize: textScale(23),
        color: colors.white
    },
    editNo: {
        color: colors.Forgot,
        fontSize: textScale(15),
        marginVertical: moderateScaleVertical(10)
    },
});

//make this component available to the app
export default ConfirmOtp;
