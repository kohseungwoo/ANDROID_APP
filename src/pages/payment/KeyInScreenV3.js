// import React, {useCallback} from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import Product from './keyIn/ProductScreen';
// import Regular from './keyIn/RegularScreen';
// import {useFocusEffect, useNavigation, useNavigationState} from '@react-navigation/native';
//
//
// // AppContent (Stack)
// // └── MAIN (TabNavigator)
// //     └── PAYMENT (Tab.Screen)
// //         └── PaymentScreenV3 (화면 내부에서 <KeyInScreenV3 /> 직접 렌더링)
// //             └── KeyInScreenV3
// //                 └── PRODUCT
// //                     └── REGULAR
//
// const Stack = createStackNavigator();
// const KeyInScreenV3 = ({ formData, setFormData }) => {
//
//     return (
//         <Tab.Navigator>
//             <Tab.Screen name="PRODUCT" component={Product} options={{ title: '상품' }} />
//             <Tab.Screen name="REGULAR" component={Regular} options={{ title: '일반결제' }} />
//         </Tab.Navigator>
//         // <Product
//         //             formData={formData}
//         //             setFormData={setFormData}
//         //         />
//         // <Stack.Navigator
//         //     initialRouteName ="PRODUCT"
//         //     screenOptions={{ headerShown: false }}
//         // >
//         //     <Stack.Screen name="PRODUCT">
//         //         {(props) => (
//         //             <Product
//         //                 {...props}
//         //                 formData={formData}
//         //                 setFormData={setFormData}
//         //             />
//         //         )}
//         //     </Stack.Screen>
//         //     <Stack.Screen name="REGULAR">
//         //         {(props) => (
//         //             <Regular
//         //                 {...props}
//         //                 formData={formData}
//         //                 setFormData={setFormData}
//         //             />
//         //         )}
//         //     </Stack.Screen>
//         // </Stack.Navigator>
//     );
// };
//
// export default KeyInScreenV3;


import React from 'react';
import { View } from 'react-native';
import KeyInTabNavigator from '../../components/KeyInTabNavigator';

const KeyInScreenV3 = ({ formData, setFormData }) => {
    return (
        <View style={{ flex: 1 }}>
            <KeyInTabNavigator formData={formData} setFormData={setFormData} />
        </View>
    );
};

export default KeyInScreenV3;
