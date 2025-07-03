import React from 'react';
import {Modal, ScrollView, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import styles from '../../assets/styles/NotintModalStyle';
import RenderHTML from 'react-native-render-html';

const tagsStyles = {
    h3:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    p: {
        fontSize: 13,
        lineHeight: 22,
        color: '#333',
        marginBottom: 10,
    },
    strong: {
        fontWeight: 'bold',
    },
    br: {
        marginBottom: 4,
    }
};

const NointModal = ({ visible, message, onConfirm }) => {
    const { width } = useWindowDimensions();

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
        >
            <View style={styles.backdrop}>
                <View style={styles.modalBox}>
                    <ScrollView style={styles.scrollArea}>
                        {/*<Text style={styles.message}>{message}</Text>*/}
                        <RenderHTML
                            contentWidth={width}
                            source={{ html: message }}
                            tagsStyles={tagsStyles}
                            ignoredDomTags={['font']}
                        />
                    </ScrollView>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                            <Text style={styles.confirmText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default NointModal;
