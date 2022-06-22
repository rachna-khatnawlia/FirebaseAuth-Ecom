//import liraries
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import WrapperContainer from '../../../Components/WrapperContainer';
import imagePath from '../../../constants/imagePath';
import { moderateScale, moderateScaleVertical, textScale, width } from '../../../styles/responsiveSize';
import firestore from '@react-native-firebase/firestore';
import navigationStrings from '../../../navigation/navigationStrings';

// create a component
const Home = ({ navigation }) => {
    const { user } = useContext(AuthContext)
    const [product, setProduct] = useState(null);
    const [category, setcategory] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productList = [];

                firestore()
                    .collection('Products')
                    .get()
                    .then((querySnapshot) => {
                        // console.log("total products", querySnapshot.size)
                        querySnapshot.forEach(doc => {
                            const { Category, Description, Price, ProductImg, ProductName, Rating } = doc.data();
                            productList.push({
                                image: ProductImg,
                                name: ProductName,
                                category: Category,
                                description: Description,
                                price: Price,
                                rating: Rating
                            });
                            setProduct(productList);
                        })
                    })
            } catch (e) {
                console.log(error);
            }
        }
        fetchProduct();

        const fetchCategory = async () => {
            try {
                const categoryList = [];

                firestore()
                    .collection('ProductCategories')
                    .get()
                    .then((querySnapshot) => {
                        // console.log("total products", querySnapshot.size)
                        querySnapshot.forEach(doc => {
                            const { CategoryName, CategoryImg } = doc.data();
                            categoryList.push({
                                image: CategoryImg,
                                name: CategoryName,
                            });
                            setcategory(categoryList);
                        })
                    })
            } catch (e) {
                console.log(error);
            }
        }
        fetchCategory();
    }, [])

    const _moveToCategoryBasedProduct = (item) => {
        console.log(item.name)
        navigation.navigate(navigationStrings.CATEGORY_BASED_PRODUCTS,
            { category: item.name }
        )
    }
    const renderProduct = ({ item }) => {
        const name = item.name;
        const myArray = name.split(" ")
        const slice6words = myArray.slice(0, 5);
        const string = slice6words.join(' ');
        console.log(string);
        return (
            <View style={styles.flatlistContainer}>
                <Image source={{ uri: item.image }}
                    style={styles.productImg}
                />
                <View style={{ paddingVertical: moderateScaleVertical(5), width:width/3 }}>
                    <Text style={styles.productTitle}>{string}...</Text>
                    <Text>{item.price}</Text>
                    <Text>{item.rating}</Text>
                </View>
            </View>
        )
    }
    const renderCategory = ({ item }) => {
        // console.log(item)
        return (
            <TouchableOpacity style={styles.flatlistContainerCategory}
                onPress={() => _moveToCategoryBasedProduct(item)}
            >
                <Image source={{ uri: item.image }}
                    style={styles.categoryImg}
                    resizeMode='stretch'
                />
                <View style={{ paddingVertical: moderateScaleVertical(5) }}>
                    <Text style={styles.categoryTitle}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <WrapperContainer>
            <View style={{ padding: moderateScale(15) }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Image source={imagePath.listDrawer} style={styles.listIcon} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>Welcome {user?._user?.email}</Text>
                </View>

                <FlatList
                    horizontal={true}
                    data={product}
                    renderItem={renderProduct}
                    showsHorizontalScrollIndicator = {false}
                />
                <Text>Categories</Text>
                <FlatList
                    data={category}
                    renderItem={renderCategory}
                    numColumns={3}
                />
            </View>
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    listIcon: {
        height: width / 11,
        width: width / 11,
    },
    flatlistContainer: {
        padding: moderateScale(5),
        borderWidth: 0.5,
        margin: moderateScale(8),
        marginLeft: 0,
        height: moderateScale(240),
        borderRadius: moderateScale(5),
    },
    productImg: {
        width: width / 3,
        height: width / 3,
    },
    productTitle: {
        textAlign: 'center',
        fontSize: textScale(14),
        textAlign:'justify',
        marginBottom:moderateScale(6)
    },
    flatlistContainerCategory: {
        // padding: moderateScale(5),
        borderWidth: 1,
        margin: moderateScale(5),
        marginRight: moderateScale(8),
        marginLeft: 0,
        height: moderateScale(160),
        borderRadius: moderateScale(3),
    },
    categoryTitle: {
        textAlign: 'center',
        fontSize: textScale(14),
        fontWeight:'600',
        marginBottom:moderateScale(6)
    },
    categoryImg: {
        width: width / 3.5,
        height: width / 3,
        overflow: 'hidden',
    },
});

//make this component available to the app
export default Home;
