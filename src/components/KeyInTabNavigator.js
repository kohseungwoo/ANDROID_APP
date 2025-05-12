// components/KeyInTabNavigator.js
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductScreen from '../pages/payment/keyIn/ProductScreen';
import RegularScreen from '../pages/payment/keyIn/RegularScreen';

const Tab = createMaterialTopTabNavigator();

const KeyInTabNavigator = ({ formData, setFormData }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="PRODUCT">
                {() => (
                    <ProductScreen
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen name="REGULAR">
                {() => (
                    <RegularScreen
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default KeyInTabNavigator;
