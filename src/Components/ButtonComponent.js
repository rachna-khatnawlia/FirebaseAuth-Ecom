import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import { moderateScale, moderateScaleVertical, textScale, width } from '../styles/responsiveSize';

export default function Button({
    buttonText = '',
    btnStyle = {},
    buttonTxt = {},
    btnIcon,
    onPress = () => { },
}) {
    return (

        <TouchableOpacity
            style={{
                ...styles.btnStyle,
                ...btnStyle,
            }}
            onPress={onPress}>
            {!!btnIcon ? <Image source={btnIcon} style={styles.imgIcon} /> : <View />}


            <Text style={{
                ...styles.buttonTxt,
                ...buttonTxt
            }}>{buttonText}</Text>

            <View />

        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    btnStyle: {
        height: moderateScale(52),
        width: "100%",
        backgroundColor: '#837893',
        borderRadius: moderateScale(3),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf:'center',
        marginVertical:moderateScaleVertical(7)
    },
    buttonTxt: {
        fontSize: textScale(16),
        fontWeight: '600',
        textAlign: 'center',
        color: colors.white,
    },
    imgIcon: {
        marginLeft: moderateScale(19)
    }
});
