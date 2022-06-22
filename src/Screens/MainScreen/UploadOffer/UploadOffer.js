//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, Image, ActivityIndicator } from 'react-native';
import WrapperContainer from '../../../Components/WrapperContainer';
import { moderateScale, textScale, moderateScaleVertical } from '../../../styles/responsiveSize';
import Input from '../../../Components/Input';
import Button from '../../../Components/ButtonComponent';
import strings from '../../../constants/lang';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


// create a component
const UploadOffer = () => {
    const [upDateData, setUpdateData] = useState({
        productImg: null,
        uploading: false,

    })
    const { productImg, uploading } = upDateData;
    const updateState = (data) => setUpdateData(state => ({ ...state, ...data }));
    const onChangeTextResult = (key, value) => {
        // console.log(key, value, "key");
        updateState({ [key]: value })
    }

    function takePhotoFromCamera() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            const imageuri = Platform.OS === 'ios' ? image?.sourceURL : image?.path;
            onChangeTextResult("productImg", imageuri);
            console.log(productImg);
        });
    }
    function choosePhotoFromGallery() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            const imageuri = Platform.OS === 'ios' ? image?.sourceURL : image?.path;
            onChangeTextResult("productImg", imageuri);
            console.log(productImg);
        });
    }
    const selectImage = () => {

        Alert.alert(
            "Upload Image",
            "Choose an option",
            [
                {
                    text: "Camera",
                    onPress: takePhotoFromCamera
                },
                {
                    text: "Gallery",
                    onPress: choosePhotoFromGallery,

                },
                {
                    text: "Cancel",
                    onPress: () => console.log("OK Pressed"),
                    style: "cancel"
                }
            ]
        );

    }
    const uploadImage = async () => {
        const uploaduri = productImg;
        const filename = uploaduri.substring(uploaduri.lastIndexOf('/') + 1);

        onChangeTextResult("uploading", true)
        const storageRef = storage().ref(`categoryPhotos/${filename}`);
        const storeImg = storageRef.putFile(uploaduri);

        try {
            await storeImg;

            const imgUrl = await storageRef.getDownloadURL();

            onChangeTextResult("uploading", false)
            onChangeTextResult("productImg", null);

            return imgUrl
        } catch (error) {
            console.log(error);
        }
    }
    const submitProduct = async () => {
        const image = await uploadImage();
        console.log(image)

        firestore()
            .collection('ProductOffers')
            .add({
                CategoryImg: image,
                postTime: firestore.Timestamp.fromDate(new Date())
            }).then(() => {
                alert("Product Uploaded");

            }).catch((error) => {
                console.log(error);
            })

    }

    return (
        <WrapperContainer>
            <ScrollView style={{ flex: 1, paddingHorizontal: moderateScale(15) }}>
                <Text style={styles.heading}>Upload New Offer</Text>

                <View style={{ height: 100, width: 100 }}>
                    {
                        (productImg != null) ?
                            <Image source={{ uri: productImg }} style={{ height: 100, width: 100 }} />
                            : null
                    }
                </View>
                <TouchableOpacity onPress={selectImage}>
                    <Text style={{textAlign:'center'}}>image gallery</Text>
                </TouchableOpacity>

            </ScrollView>
            <KeyboardAvoidingView enabled={true} behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
                <View style={{ paddingHorizontal: moderateScale(15) }}>
                    {
                        uploading ?
                            <ActivityIndicator size="large" color="grey" />
                            :
                            <Button
                                buttonText='Upload Offer'
                                onPress={submitProduct}
                            />
                    }
                </View>
            </KeyboardAvoidingView>
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    heading: {
        textAlign: 'center'
    }
});

//make this component available to the app
export default UploadOffer;
