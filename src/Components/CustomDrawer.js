//import liraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { AuthContext } from './FirebaseAuthProvider';
import imagePath from '../constants/imagePath';
import { height, moderateScale, textScale, width } from '../styles/responsiveSize';

export function CustomDrawer(props) {
    const { user, logout } = useContext(AuthContext)
    console.log(width)
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ position: 'relative', height: height }}>
                <Image source={imagePath.profile} style={styles.profile} />
                <Text style={{ textAlign: 'center' }}>{user?._user?.email}</Text>
                <TouchableOpacity style={styles.drawerNav}>
                    <Image
                        source={imagePath.logout}
                        style={styles.drawerIcon}
                    />
                    <Text style={styles.drawerTxt}>SignOut</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerNav}>
                    <Image
                        source={imagePath.logout}
                        style={styles.drawerIcon}
                    />
                    <Text style={styles.drawerTxt}>SignOut</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerNav}>
                    <Image
                        source={imagePath.logout}
                        style={styles.drawerIcon}
                    />
                    <Text style={styles.drawerTxt}>SignOut</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerNav}>
                    <Image
                        source={imagePath.logout}
                        style={styles.drawerIcon}
                    />
                    <Text style={styles.drawerTxt}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.drawerNav, { position: 'absolute', bottom: '9%' }]}  onPress={() => logout()}>
                    <Image
                        source={imagePath.logout}
                        style={styles.drawerIcon}
                    />
                    <Text style={styles.drawerTxt}>SignOut</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    profile: {
        borderRadius: width / 2,
        borderWidth: 2,
        width: width / 3,
        height: width / 3,
        borderColor: 'grey',
        alignSelf: 'center',
        marginBottom: moderateScale(10)
    },
    drawerNav: {
        flexDirection: 'row',
        paddingHorizontal: moderateScale(15),
        marginVertical: moderateScale(3)
    },
    drawerIcon: {
        height: width / 12,
        width: width / 12
    },
    drawerTxt: {
        alignSelf: 'center',
        fontSize: textScale(14),
        paddingHorizontal: moderateScale(10)
    },
})