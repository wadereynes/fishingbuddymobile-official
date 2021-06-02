import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Pressable, ActionSheetIOS } from 'react-native';
import { theme } from '../../constants/';
import { firebase } from '../../config/firebase';
import Toast from 'react-native-toast-message';


export const LogoutButton = () => {
    const [modalVisible, setModalVisible] = useState(false);
    
    const onPressSignOut = () => {
        if(Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    title:'Are you sure you want to sign out?',
                    options: ["Cancel", "Logout"],
                    destructiveButtonIndex: 1,
                    cancelButtonIndex: 0,
                    userInterfaceStyle: 'dark'
                },
                buttonIndex => {
                    if (buttonIndex === 0) {
                        // cancel action
                    } 
                    else if (buttonIndex === 1) {
                        signOutUser();
                    }
                }
            );
        }
        else {
            setModalVisible(true);
        }
    }

    const signOutUser = () => {
        firebase.auth().signOut().then(() => {
            console.log('User signed out!');
            Toast.show({
                text1: 'You have been logged out!',
                position: 'bottom',
                bottomOffset: theme.dimensions.height * 0.1,
                type: 'info',
            });
        });
    }

    return (
        <View >
            <TouchableOpacity style={{...styles.buttonWithIcon, backgroundColor:theme.colors.google}} onPress={()=> onPressSignOut()} >
                <Text style={{...styles.buttonText}}>Logout</Text>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                            <View style={{ flexDirection:'row'}}>
                                <Pressable
                                    style={[styles.button, styles.modalButton2]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                        signOutUser();
                                    }}
                                >
                                    <Text style={{...styles.textStyle, color: theme.colors.primary,}}>Yes</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.modalButton]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        marginVertical: 30,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily:'Medium'
    },
    modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginRight:5,
        paddingHorizontal:40,
        backgroundColor: theme.colors.primary,
    },
    modalButton2: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginRight:5,
        paddingHorizontal:40,
        borderColor: theme.colors.primary,
        borderWidth: 2,
        backgroundColor: theme.colors.white,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily:'Bold'
    },
    buttonWithIcon:{
        display:'flex',
        marginHorizontal:7,
        paddingVertical:10,
        paddingHorizontal:20,
        marginBottom:50,
        borderRadius:23,
        flexDirection:'row',
        justifyContent: "center",
    },
    buttonText:{
        color:theme.colors.white,
        fontFamily:"Medium",
        fontSize:16,
    },
});