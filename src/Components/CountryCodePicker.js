import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import CountryPicker, { Flag } from 'react-native-country-picker-modal';
import imagePath from '../constants/imagePath';
import { moderateScale, moderateScaleVertical, width } from '../styles/responsiveSize';

function CountryCodePicker({ 
    countryCode, 
    setCountryCode, 
    countryFlag, 
    setCountryFlag 
}) {
    // const [countryCode, setCountryCode] = useState('91');
    // const [countryFlag, setCountryFlag] = useState('IN');

    const onSelect = country => {
        setCountryFlag(country.cca2);
        setCountryCode(country.callingCode[0]);
    };  
    console.log(countryCode)

    return (
        <>
            <View style={style.countryview}>
                <CountryPicker
                    onSelect={onSelect}
                    visible={false}
                    countryCode={countryFlag}
                    withCallingCode={true}
                    withCallingCodeButton={countryCode}
                    withEmoji={true}
                    theme={{
                        onBackgroundTextColor: 'black',
                        backgroundColor: 'white'
                    }}

                />
                <Image
                    source={imagePath.downArrow}
                    style={{
                        height: moderateScale(width / 20),
                        width: moderateScale(width / 20),
                        resizeMode: 'contain',
                        marginLeft: moderateScaleVertical(7),
                    }}
                />

            </View>

        </>
    );
}
const style = StyleSheet.create({
    countryview: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: moderateScale(10),
        marginRight: moderateScale(5),
        height: moderateScale(54),
        marginTop: moderateScaleVertical(10),
        width: width / 3.6,
        borderWidth: 1.5,
        marginHorizontal: moderateScale(15),
        flex: 0.27,
    },
});

export default CountryCodePicker;