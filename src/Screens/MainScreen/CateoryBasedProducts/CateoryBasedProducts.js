//import liraries
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import WrapperContainer from '../../../Components/WrapperContainer';
import { moderateScale, moderateScaleVertical, textScale, width } from '../../../styles/responsiveSize';
import firestore from '@react-native-firebase/firestore';
import Button from '../../../Components/ButtonComponent';
import navigationStrings from '../../../navigation/navigationStrings';

// create a component
const CategoryBasedProducts = ({ navigation, route }) => {
    const categoryOfProducts = route?.params?.category;

    const { user } = useContext(AuthContext)
    const [product, setProduct] = useState(null);
    const [productCount, setProductCount] = useState('')

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productList = [];

                firestore()
                    .collection('Products')
                    .where('Category', '==', categoryOfProducts)
                    .get()
                    .then((querySnapshot) => {
                        console.log("total products", querySnapshot.size)
                        setProductCount(querySnapshot.size)
                        querySnapshot.forEach(doc => {
                            const { Category, Description, Price, ProductImg, ProductName, Rating, postTime } = doc.data();
                            productList.push({
                                image: ProductImg,
                                name: ProductName,
                                category: Category,
                                description: Description,
                                price: Price,
                                rating: Rating,
                                postTime:postTime,
                            });
                            setProduct(productList);
                        })
                    })
            } catch (error) {
                console.log(error);
            }
        }
        fetchProduct();


    }, [])

    const renderProduct = ({ item }) => {
        const name = item.name;
        const myArray = name.split(" ")
        const slice6words = myArray.slice(0, 6);
        const string = slice6words.join(' ');
        // console.log(string);
        return (
            <View style={styles.flatlistContainer}>
                <Image source={{ uri: item.image }}
                    style={styles.productImg}
                />
                <View style={styles.productDetails}>
                    <Text style={styles.productTitle}>{string}</Text>
                    <Text>{item.price}</Text>
                    <Text>{item.rating}</Text>
                    <Button
                        buttonText="View Product"
                        btnStyle={{ height: moderateScale(38) }}
                        buttonTxt={{ fontSize: textScale(13.5) }}
                        onPress={() => { navigation.navigate(navigationStrings.VIEW_PRODUCT,{item:item}) }}
                    />
                </View>
            </View>
        )
    }

    return (
        <WrapperContainer>
            <Text style={styles.categoryHeading}>{categoryOfProducts}</Text>
            {
                productCount ?
                    <View style={{ marginHorizontal: moderateScale(10) }}>
                        <FlatList
                            data={product}
                            renderItem={renderProduct}
                        />
                    </View> :
                    <View style={styles.noAvailableProductBox}>
                        <Text style={styles.noAvailableProduct}>No Product available</Text>
                    </View>
            }
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    categoryHeading: {
        textAlign: 'center',
        fontSize: textScale(17),
        paddingVertical: moderateScaleVertical(10),
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    flatlistContainer: {
        padding: moderateScale(5),
        borderWidth: 0.5,
        margin: moderateScale(8),
        marginLeft: 0,
        height: moderateScale(140),
        borderRadius: moderateScale(5),
        flexDirection: 'row'
    },
    productImg: {
        width: width / 2.3,
        height: width / 3,
    },
    productTitle: {
        textAlign: 'center',
        fontSize: textScale(14),
        textAlign: 'justify',
        marginBottom: moderateScale(6)
    },
    productDetails: {
        width: width / 2.3,
        paddingLeft: moderateScale(10)
    },
    noAvailableProductBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noAvailableProduct: {
        fontSize: textScale(18),
        fontWeight: '500',
        color: 'red'
    }

});

//make this component available to the app
export default CategoryBasedProducts;

