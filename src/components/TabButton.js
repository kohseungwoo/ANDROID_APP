import React, {useEffect, useRef} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';

const TabButton = ({ focused, props, label, animation }) => {
    const animationRef = useRef(null);
    useEffect(() => {
        if(focused){
            animationRef.current?.play();
        }else{
            animationRef.current?.reset();
        }
    }, [focused]);

    return (
        <TouchableOpacity {...props} activeOpacity={1} style={{ alignItems: 'center' }}>
            <LottieView
                ref={animationRef}
                source={animation}
                loop={false}
                autoPlay={false}
                style={{ width: 28, height: 28 }}
            />
            <Text style={{
                color: focused ? '#000' : '#808080',
                fontWeight: focused ? 'bold' : 'normal',
                fontSize: 10,
                marginTop: 2,
            }}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default TabButton;
