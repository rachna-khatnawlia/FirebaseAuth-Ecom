//import liraries
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { AuthContext } from '../../../Components/FirebaseAuthProvider';
import WrapperContainer from '../../../Components/WrapperContainer';
import imagePath from '../../../constants/imagePath';
import { moderateScale, width } from '../../../styles/responsiveSize';
import firestore from '@react-native-firebase/firestore';

// create a component
const Home = ({ navigation }) => {
    const { user } = useContext(AuthContext)
    console.log(user)
    console.log(navigation);

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productList = [];

                firestore()
                    .collection('Products')
                    .get()
                    .then((querySnapshot) => {
                        console.log("total products", querySnapshot.size)
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
                        })
                    })
                setProduct(productList);
                console.log(productList)
            } catch (e) {
                console.log(error);
            }
        }
        fetchProduct();
    }, [])

    const renderProduct = ( element ) => {
        console.log(element.item.description);
        return (
            <View style={{backgroundColor:'red'}}>
                <Text>hello</Text>
            </View>
        )
    }
    return (
        <WrapperContainer>
            <View style={{ flexDirection: 'row', paddingHorizontal: moderateScale(15) }}>
                <TouchableOpacity
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Image source={imagePath.listDrawer} style={styles.listIcon} />
                </TouchableOpacity>
            </View>
            <View>
                <Text>Welcome {user?._user?.email}</Text>
            </View>
            
            <FlatList
                data={product}
                renderItem={(element) => renderProduct(element)}
            />
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    listIcon: {
        height: width / 11,
        width: width / 11,
    }

});

//make this component available to the app
export default Home;
