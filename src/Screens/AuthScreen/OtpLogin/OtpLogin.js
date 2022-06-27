//import liraries
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Button from '../../../Components/ButtonComponent';
import CountryCodePicker from '../../../Components/CountryCodePicker';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import GoBack from '../../../Components/goBack';
import Input from '../../../Components/Input';
import WrapperContainer from '../../../Components/WrapperContainer';
import strings from '../../../constants/lang';
import navigationStrings from '../../../navigation/navigationStrings';
import { moderateScale, textScale } from '../../../styles/responsiveSize';

// create a component
const OtpLogin = ({ navigation }) => {
    const [countryCode, setCountryCode] = useState('91');
    const [countryFlag, setCountryFlag] = useState('IN');

    const [upDateData, setUpdateData] = useState({
        phone: '',
    })
    const { phone } = upDateData;
    const updateState = (data) => setUpdateData(state => ({ ...state, ...data }));
    const onChangeTextResult = (key, value) => {
        console.log(key, value, "key");
        updateState({ [key]: value })
    }

    const { phoneLogin } = useContext(AuthContext);

    const _onPhoneLogin = () => {
        phoneLogin(countryCode, phone)
        navigation.navigate(navigationStrings.CONFIRM_OTP)
    }
    return (
        <WrapperContainer>
            <GoBack headerText={strings.PHONE_LOGIN} />
            <ScrollView>
                <Text style={styles.heading}>{strings.SEND_OTP}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <CountryCodePicker 
                        countryCode={countryCode} 
                        setCountryCode={setCountryCode}
                        countryFlag={countryFlag}
                        setCountryFlag={setCountryFlag}
                    />
                    <View style={{ flex: 0.68 }}>
                        <Input
                            placeholder={strings.PHONE_LOGIN}
                            value={phone}
                            onChangeText={(value) => onChangeTextResult('phone', value)}
                        />
                    </View>
                </View>
                <Text>{phone}</Text>
            </ScrollView>
            <KeyboardAvoidingView enabled={true} behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
                <View style={{ paddingHorizontal: moderateScale(15) }}>
                    <Text style={styles.resendeOtp}>{strings.RESEND_OTP} 15:00</Text>
                    <Button
                        buttonText={strings.LOGIN}
                        onPress={_onPhoneLogin}
                    />
                </View>
            </KeyboardAvoidingView>
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
    },
    heading: {
        fontSize: textScale(17),
        paddingHorizontal: moderateScale(15),
        paddingBottom: moderateScale(20),
        paddingTop: moderateScale(5)
    },
    resendeOtp: {
        fontSize: textScale(15),
        alignSelf: 'flex-start'
    }
});

//make this component available to the app
export default OtpLogin;
