import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    StatusBar,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal,
    Alert,
    Pressable,
} from "react-native";
import * as Icon from "@expo/vector-icons";

import axios from "axios";
import { theme } from '../../constants/';


export const FishListModal = (props) => {
    const [searchText, setSearchText] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(props.isVisible);


    const [users, setUsers] = useState([]);    
    useEffect(() => {
        StatusBar.setBarStyle("dark-content", false);
        axios.get("https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/fishlist").then(({ data }) => {
            setUsers(data);
        });
    }, []);

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <View style={styles.inputView}>
                        <TextInput
                            defaultValue={searchText}
                            style={styles.input}
                            placeholder="Search"
                            textContentType="name"
                            onChangeText={(text) => {
                                setSearchText(text);
                                // if (text === "") {
                                //     return setFilteredUsers([]);
                                // }
                                const filtered_users = users.filter((user) =>
                                    user.fishLocalName.toLowerCase().startsWith(text.toLowerCase())
                                );
                                setFilteredUsers(filtered_users);
                            }}
                            returnKeyType="search"
                        />
                        {
                            searchText.length === 0 ? (
                                <TouchableOpacity>
                                    <Icon.MaterialIcons name="search" size={24} color="#333" />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                    setSearchText("");
                                    setFilteredUsers([]);
                                    }}
                                >
                                    <Icon.MaterialIcons name="cancel" size={24} color="#333" />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    { filteredUsers.length > 0 ? (
                        <ScrollView>
                            {filteredUsers.map((user) => (
                                <TouchableOpacity
                                    style={styles.userCard}
                                    onPress={() => {
                                        Alert.alert(
                                            `${user.fishCommonName} `,
                                            `You selected ${user.fishCommonName} `
                                        );
                                        props.fishSelected(user);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Image
                                        style={styles.userImage}
                                        source={{ uri: user.fishImage }}
                                    />
                                    <View style={styles.userCardRight}>
                                        <Text style={{ fontSize: 18 }}>{`${user.fishCommonName} `}</Text>
                                        <Text style={{ fontFamily:'Italic', fontSize: 12 }}>{`${user.fishLocalName}`}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                            
                        </ScrollView>
                        ) : searchText.length > 0 ? (
                            <View style={styles.messageBox}>
                                <Text style={styles.messageBoxText}>No fish found</Text>
                            </View>
                        ) : (
                            <View style={styles.messageBox}>
                                <Text style={styles.messageBoxText}>Search for fish</Text>
                            </View>
                        )
                    }
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
},
searchView: {
    display: "flex",
    flexDirection: "row",
},
inputView: {
    height: 40,
    backgroundColor: "#dfe4ea",
    paddingHorizontal: 10,
    borderRadius: 23,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
},
input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    fontFamily:'Medium'
},
userCard: {
    width: theme.dimensions.width,
    backgroundColor: "#fafafa",
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
},
userImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
    resizeMode: 'contain'
},
userCardRight: {
    paddingHorizontal: 10,
},
messageBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
},
messageBoxText: {
    fontSize: 20,
    fontFamily: "Medium",
},
});

const modalStyles = StyleSheet.create({
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        marginHorizontal: 30,
        marginVertical: 70,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
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