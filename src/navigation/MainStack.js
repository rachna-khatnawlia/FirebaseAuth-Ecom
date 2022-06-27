//import liraries
import React from 'react';
import { AdminHome, CateoryBasedProducts, UploadCategory, UploadNewProduct, UploadOffer, ViewProduct } from '../Screens';
import DrawerStack from './DrawerStack';
import navigationStrings from './navigationStrings';

// create a component
const MainStack = (Stack) => {
    return (
        <>
            <Stack.Screen name={navigationStrings.DRAWER} component={DrawerStack} options={{ headerShown: false }} />
            <Stack.Screen name={navigationStrings.ADMIN_HOME} component={AdminHome} options={{ headerShown: false }} />
            <Stack.Screen name={navigationStrings.UPLOAD_NEW_PRODUCT} component={UploadNewProduct} options={{ headerShown: true }} />
            <Stack.Screen name={navigationStrings.UPLOAD_CATEGORY} component={UploadCategory} options={{ headerShown: true }} />
            <Stack.Screen name={navigationStrings.CATEGORY_BASED_PRODUCTS} component={CateoryBasedProducts} options={{headerShown:true}}/>
            <Stack.Screen name={navigationStrings.UPLOAD_OFFERS} component={UploadOffer} options={{headerShown:true}}/>
            <Stack.Screen name={navigationStrings.VIEW_PRODUCT} component={ViewProduct} options={{headerShown:false}}/>

        </>
    );
};

//make this component available to the app
export default MainStack;
