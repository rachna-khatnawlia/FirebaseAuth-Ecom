//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import WrapperContainer from '../../../Components/WrapperContainer';
import { moderateScale, textScale, width } from '../../../styles/responsiveSize';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import Button from '../../../Components/ButtonComponent';
import colors from '../../../styles/colors';


// create a component
const Cart = () => {
    const [cartItem, setCartItem] = useState(null);
    const [product, setProduct] = useState(null);
    const [totalProductCount, setTotalProductCount] = useState(null);
    const [cartCount, setCartCount] = useState(1);

    const { user } = useContext(AuthContext)
    const userId = user?._user?.uid
    // console.log(userId)

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const productList = [];

                firestore()
                    .collection(`Cart ${userId}`)
                    .get()
                    .then((querySnapshot) => {
                        // console.log("total cart value of a user", querySnapshot.size)
                        setTotalProductCount(querySnapshot.size)

                        querySnapshot.forEach(doc => {
                            const { ProductId, PostTime } = doc.data();
                            productList.push({
                                ProductId: ProductId,
                                PostTime: PostTime
                            });

                            setCartItem(productList);
                            // console.log("cart items", cartItem)
                        })
                    })
            } catch (error) {
                console.log(error);
            }
        }
        fetchCart();

        const fetchProduct = async () => {
            try {
                const productList = [];

                for (const index in cartItem) {
                    firestore()
                        .collection(`Products`)
                        .where(firebase.firestore.FieldPath.documentId(), '==', `${cartItem[index]['ProductId']}`)
                        .get()
                        .then((querySnapshot) => {
                            console.log("total products added to cart", querySnapshot.size)

                            querySnapshot.forEach(doc => {
                                const { Category, Description, Price, ProductImg, ProductName, Rating, postTime } = doc.data();
                                productList.push({
                                    image: ProductImg,
                                    name: ProductName,
                                    category: Category,
                                    description: Description,
                                    price: Price,
                                    rating: Rating,
                                    postTime: postTime,
                                });
                                setProduct(productList);
                                console.log("product matches with product table", product)
                            })
                        })
                }
            } catch (error) {
                console.log(error);
            }

        }
        fetchProduct();
    }, [])

    const renderCartItem = ({ item }) => {
        console.log("item aded to cart", item?.image)
        const name = item.name;
        const myArray = name.split(" ")
        const slice6words = myArray.slice(0, 6);
        const string = slice6words.join(' ');
        // console.log(string);
        return (
            <View style={styles.flatlistContainer}>
                <Image source={{ uri: item?.image }}
                    style={styles.productImg}
                />
                <View style={styles.productDetails}>
                    <Text style={styles.productTitle}>{string}</Text>
                    <Text>{item.price}</Text>
                    <Text>Rating:{item.rating}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  }}>
                        <View style={{ flex: 0.30 }}>
                            <Button
                                buttonText='-'
                                onPress={() => setCartCount(cartCount - 1)}
                                btnStyle={{ height: moderateScale(30), backgroundColor:colors.greyManualLocation, borderWidth:1.5}}
                            />
                        </View>
                        <View style={{paddingHorizontal:moderateScale(11), borderWidth:1, height:moderateScale(30)}}>
                            <Text style={styles.cartCount}>{cartCount}</Text>
                        </View>
                        <View style={{ flex: 0.30 }}>
                            <Button
                                buttonText='+'
                                onPress={() => setCartCount(cartCount + 1)}
                                btnStyle={{ height: moderateScale(30), backgroundColor:colors.greyManualLocation, borderWidth:1.5}}
                            />
                        </View>


                    </View>
                    {/* <Button
                        buttonText="View Product"
                        btnStyle={{ height: moderateScale(38) }}
                        buttonTxt={{ fontSize: textScale(13.5) }}
                        // onPress={() => { navigation.navigate(navigationStrings.VIEW_PRODUCT, { item: item }) }}
                    /> */}
                </View>
            </View>
        )
    }
    return (
        <WrapperContainer>
            <View style={{ paddingHorizontal: moderateScale(15) }}>
                <ScrollView>
                    <Text style={styles.cartHeading}>Cart</Text>
                    {
                        totalProductCount
                            ?
                            <View>
                                {/* <Text>hello cart</Text> */}
                                <FlatList
                                    data={product}
                                    renderItem={renderCartItem}
                                />
                            </View>

                            :
                            <Text>No items added.. Add Items to Cart</Text>
                    }
                </ScrollView>
            </View>
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    cartHeading: {
        flex: 1,
        alignSelf: 'center',
        fontSize: moderateScale(18),
        fontWeight: '600'
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
    cartCount:{
        fontSize:textScale(15),
        fontWeight:'bold',
    }
});

//make this component available to the app
export default Cart;
