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
import { firebase } from '../../config/firebase';

import { theme } from '../../constants';


export const GearTypeModal = (props) => {
    const [searchText, setSearchText] = useState("");
    const [rodTypes, setRodTypes] = useState([]);
    const [reelTypes, setReelTypes] = useState([]);
    const [lureTypes, setLureTypes] = useState([]);
    const [braidlineTypes, setBraidlineTypes] = useState([]);
    const [leaderlineTypes, setLeaderlineTypes] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(props.isVisible);

    
    useEffect(() => {
        axios.get("https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/braidlines").then(({ data }) => { setBraidlineTypes(data) });
        axios.get("https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/leaderlines").then(({ data }) => { setLeaderlineTypes(data) });
        axios.get("https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/rods").then(({ data }) => { setRodTypes(data) });
        axios.get("https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/lures").then(({ data }) => { setLureTypes(data) });
        axios.get("https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/reels").then(({ data }) => { setReelTypes(data) });
    }, []);

    const ResultCard = gearType => {
        console.log('gearType..', gearType);
        return(
            <TouchableOpacity
                style={styles.userCard}
                onPress={() => {
                    props.gearTypeSelected(gearType.gearType);
                    props.hideGearTypeModal(false);
                    setModalVisible(false);
                }}
            >
                <View style={styles.userCardRight}>
                    <Text style={{ fontSize: 16, fontFamily: 'Medium' }}>{`${gearType.gearType.gearTypeName} `}</Text>
                </View>
            </TouchableOpacity>
        )
    }
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
                                switch(props.type){
                                    case 'rod': {
                                        const filtered_rodTypes = rodTypes.filter((gearType) =>
                                            gearType.gearTypeName.toLowerCase().startsWith(text.toLowerCase())
                                        );
                                        setFilteredUsers(filtered_rodTypes);
                                        break;
                                    }
                                    case 'reel': {
                                        const filtered_reelTypes = reelTypes.filter((gearType) =>
                                            gearType.gearTypeName.toLowerCase().startsWith(text.toLowerCase())
                                        );
                                        setFilteredUsers(filtered_reelTypes);
                                        break;
                                    }
                                    case 'lure': {
                                        const filtered_lureTypes = lureTypes.filter((gearType) =>
                                            gearType.gearTypeName.toLowerCase().startsWith(text.toLowerCase())
                                        );
                                        setFilteredUsers(filtered_lureTypes);
                                        break;
                                    }
                                    case 'braidline': {
                                        const filtered_braidlineTypes = braidlineTypes.filter((gearType) =>
                                            gearType.gearTypeName.toLowerCase().startsWith(text.toLowerCase())
                                        );
                                        setFilteredUsers(filtered_braidlineTypes);
                                        break;
                                    }
                                    case 'leaderline': {
                                        const filtered_leaderlineTypes = leaderlineTypes.filter((gearType) =>
                                            gearType.gearTypeName.toLowerCase().startsWith(text.toLowerCase())
                                        );
                                        setFilteredUsers(filtered_leaderlineTypes);
                                        break;
                                    }
                                }
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
                                        }}
                                >
                                    <Icon.MaterialIcons name="cancel" size={24} color="#333" />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    { filteredUsers.length > 0 ? (
                        <ScrollView>
                            { filteredUsers.map((gearType) => (
                                <TouchableOpacity
                                    style={styles.userCard}
                                    onPress={() => {
                                        // Alert.alert(
                                        //     `You selected ${gearType.gearTypeName} `
                                        // );
                                        props.gearTypeSelected(gearType);
                                        props.hideGearTypeModal(false);
                                        setModalVisible(false);
                                    }}
                                >
                                    <View style={styles.userCardRight}>
                                        <Text style={{ fontSize: 16, fontFamily:'Medium' }}>{`${gearType.gearTypeName} `}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                            
                        </ScrollView>
                        ) : searchText.length > 0 ? (
                            <View style={styles.messageBox}>
                                <Text style={styles.messageBoxText}>{props.type} type not found</Text>
                            </View>
                        ) : (
                            <ScrollView>
                            
                            { 
                                props.type === 'rod' ? rodTypes.map((gearType) => (
                                    <ResultCard gearType={gearType} />
                                ))
                                : props.type === 'reel' ? reelTypes.map((gearType) => (
                                    <ResultCard gearType={gearType} />
                                ))
                                : props.type === 'lure' ? lureTypes.map((gearType) => (
                                    <ResultCard gearType={gearType} />
                                ))
                                : props.type === 'braidline' ? braidlineTypes.map((gearType) => (
                                    <ResultCard gearType={gearType} />
                                ))
                                : props.type === 'leaderline' ? leaderlineTypes.map((gearType) => (
                                    <ResultCard gearType={gearType} />
                                ))
                                : null
                            }
                            
                        </ScrollView>
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
    width: theme.dimensions.width * 0.75,
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
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
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