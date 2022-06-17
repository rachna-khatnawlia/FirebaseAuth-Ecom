//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, Image, ActivityIndicator } from 'react-native';
import WrapperContainer from '../../../Components/WrapperContainer';
import firestore from '@react-native-firebase/firestore';
import { moderateScale, textScale, moderateScaleVertical } from '../../../styles/responsiveSize';
import Input from '../../../Components/Input';
import Button from '../../../Components/ButtonComponent';
import strings from '../../../constants/lang';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

// create a component
const UploadNewProduct = ({ navigation }) => {
    const [upDateData, setUpdateData] = useState({
        productImg: null,
        uploading: false,
        productName: '',
        category: '',
        description: '',
        price: '',
        rating: '',
    })
    const { productImg, productName, category, description, price, rating, uploading } = upDateData;
    const updateState = (data) => setUpdateData(state => ({ ...state, ...data }));
    const onChangeTextResult = (key, value) => {
        // console.log(key, value, "key");
        updateState({ [key]: value })
    }
    useEffect(() => {
        // hasGalleryPermissions();
    }, [])

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
    const uploadImage = async () =>{
        const uploaduri = productImg;
        const filename = uploaduri.substring(uploaduri.lastIndexOf('/') + 1);

        onChangeTextResult("uploading", true)
        const storageRef = storage().ref(`productPhotos/${filename}`);
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
        // firestore()
        //     .collection('Products')
        //     .add({
        //         ProductImg: productImg,
        //         ProductName: productName,
        //         Category: category,
        //         Description: description,
        //         Price: `Rs. ${price}`,
        //         Rating: rating,
        //         postTime: firestore.Timestamp.fromDate(new Date())
        //     }).then(() => {
        //         alert("Product Uploaded")
        //     }).catch((error) => {
        //         console.log(error);
        //     })

    }
    return (
        <WrapperContainer>
            <ScrollView style={{ flex: 1, paddingHorizontal: moderateScale(15) }}>
                <Text style={styles.heading}>{strings.NEW_PRODUCT}</Text>

                <TouchableOpacity onPress={selectImage}>
                    <Text>image gallery</Text>
                </TouchableOpacity>
                {
                    (productImg != null) ?
                        <Image source={{ uri: productImg }} style={{ height: 100, width: 100 }} />
                        : null
                }


                <Input
                    placeholder="Product Name"
                    value={productName}
                    onChangeText={(value) => onChangeTextResult('productName', value)}
                />
                <Input
                    placeholder="Product Category"
                    value={category}
                    onChangeText={(value) => onChangeTextResult('category', value)}
                />
                <Input
                    placeholder="Product Description"
                    value={description}
                    onChangeText={(value) => onChangeTextResult('description', value)}
                />
                <Input
                    placeholder="Price"
                    value={price}
                    onChangeText={(value) => onChangeTextResult('price', value)}
                />
                <Input
                    placeholder="Rating"
                    value={rating}
                    onChangeText={(value) => onChangeTextResult('rating', value)}
                />

            </ScrollView>
            <KeyboardAvoidingView enabled={true} behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
                <View style={{ paddingHorizontal: moderateScale(15) }}>
                    {
                        uploading ?
                            <ActivityIndicator size="large" color="grey" />
                        :
                        <Button
                        buttonText='SignUp'
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
export default UploadNewProduct;
