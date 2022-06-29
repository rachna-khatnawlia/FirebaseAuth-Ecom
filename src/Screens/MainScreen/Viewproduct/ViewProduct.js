//import liraries
import React, { Component, useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Button from '../../../Components/ButtonComponent';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import GoBack from '../../../Components/goBack';
import WrapperContainer from '../../../Components/WrapperContainer';
import { moderateScale, textScale, width } from '../../../styles/responsiveSize';

// create a component
const ViewProduct = ({ route }) => {
    const [cartAdded, setCartAdded] = useState(false)

    const data = route?.params?.item;
    const productId = data?.id;
    const productImg = data.image;

    const { user } = useContext(AuthContext);
    const userId = user?._user?.uid
    console.log(userId, productId)
    const _onAddToCart = () => {
        firestore()
            .collection(`Cart ${userId}`)
            .add({
                ProductId: productId,
                UserId: userId,
                PostTime: firestore.Timestamp.fromDate(new Date())
            }).then(() => {
                alert("Product Uploaded");
                setCartAdded(true)
            }).catch((error) => {
                console.log(error);
            })
    }
    return (
        <WrapperContainer>
            <ScrollView>
                <GoBack />
                <View style={{ paddingHorizontal: moderateScale(15) }}>
                    {/* <Text>{data?.category}</Text> */}
                    <Text style={styles.title}>{data?.name}</Text>

                    <View style={styles.productImgBox}>
                        <Image source={{ uri: productImg }} style={styles.productImg} resizeMode='stretch' />
                    </View>
                    <View style={{ marginBottom: moderateScale(12) }}>
                        <Text style={[styles.property, { alignSelf: 'flex-start' }]}>Description: </Text>
                        <Text style={[styles.value, { alignSelf: 'flex-start' }]}>{data?.description}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: moderateScale(12) }}>
                        <Text style={styles.property}>Price: </Text>
                        <Text style={styles.value}>{data?.price}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: moderateScale(12) }}>
                        <Text style={styles.property}>Rating: </Text>
                        <Text style={styles.value}>{data?.rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: moderateScale(12) }}>
                        <Text style={styles.property}>Product Uploaded on: </Text>
                        <Text style={styles.value}>{new Date(data?.postTime.toDate()).toDateString()}</Text>
                    </View>
                </View>
            </ScrollView>
            <KeyboardAvoidingView enabled={true} behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
                <View style={{ flexDirection: 'row', paddingHorizontal: moderateScale(15), justifyContent: 'space-between' }}>

                    <View style={{ flex: 0.49 }}>
                        <Button
                            buttonText='Buy Now'
                        // onPress={submitOffer}
                        />
                    </View>

                    <View style={{ flex: 0.49 }}>
                        {
                            cartAdded ?
                                <Button
                                    buttonText={'View Cart'}
                                // onPress={_onAddToCart}
                                />
                                :
                                <Button
                                    buttonText={'Add to Cart'}
                                    onPress={_onAddToCart}
                                />
                        }
                    </View>


                </View>
            </KeyboardAvoidingView>
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    title: {
        fontSize: textScale(14),
        textAlign: 'center',
        // textAlign:'justify',
    },
    productImgBox: {
        marginVertical: moderateScale(20)
    },
    productImg: {
        height: width / 1.8,
        width: width / 1.4,
        alignSelf: 'center',
        borderWidth: moderateScale(0.5)
    },
    property: { fontSize: textScale(14), fontWeight: 'bold', alignSelf: 'center' },
    value: { fontSize: textScale(13), fontWeight: '400', alignSelf: 'center' },
});

//make this component available to the app
export default ViewProduct;
