import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { theme } from '../../constants';
import * as Icon from "@expo/vector-icons";
import { firebase } from '../../config/firebase';
import { ProfileHeader } from '../../components/home/ProfileHeader';
import { ProfileContent } from '../../components/home/ProfileContent';
import { Loading } from '../../components/common/Loading';
import Axios from 'axios';


export const ViewProfileScreen = props => {
    const userId = props.route.params.userId;
    const [userProfile, setUserProfile] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([]);
    const origin = props.route.params.origin;

    useEffect(() => {
        getUserDetails();
        fetchProductsByUser();
    }, []);

    const getUserDetails = async() => {
        var currentUser = firebase.auth().currentUser;
        if(currentUser){
            await firebase.database().ref('user/' + userId).once('value', snapshot => { updateUserProfile(snapshot.val()) });
        }
    }

    const updateUserProfile = (userProfile) => { 
        setUserProfile(userProfile);
    }

    const onRefresh = useCallback(() => {
        fetchProductsByUser();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    

    const fetchProductsByUser = async() => {
        await Axios.get('https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/sellerproducts/'+props.route.params.userId).then(({ data }) =>
        {
            setProducts(data);
        });
    }
    
    if(userProfile){
        return(
            <ScrollView style={{
                flex:1,
                backgroundColor:theme.colors.white
                }}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                contentContainerStyle={{paddingBottom:150}}
            > 
                <View>
                    <Image style={styles.coverImage} source={{ uri: userProfile.coverPhoto}} PlaceholderContent={<ActivityIndicator />}/>
                    <TouchableOpacity style={{...styles.smallButton, position:'absolute', marginLeft: 10, marginTop: 40}} onPress={()=> props.navigation.goBack()}>
                        <Icon.Ionicons style={styles.headerIcon} name={'ios-arrow-back-outline'} size={20} color={theme.colors.white} />
                    </TouchableOpacity>
                    <ProfileHeader navigation={props.navigation} user={userProfile} />
                    <ProfileContent navigation={props.navigation} user={userProfile} origin={origin} products={products}/>
                </View>
                
            </ScrollView>
        );
    }
    else {
        return(
            <Loading name={'Loading...'}/>
        );
    } 
}

const styles = StyleSheet.create({
    smallButton: {
        alignItems:"center",
        justifyContent:'center',
        padding:10,
        flexDirection:'row',
        backgroundColor:'rgba(0, 93, 160, 0.2)',
        borderRadius:23,
    },
    coverImage: {
        height:240,
        width: '100%'
    },
    profileContainer:{
        backgroundColor: theme.colors.white,
        marginTop:-100,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    profileImageView: {
        alignItems:'center',
        marginTop: -50,
    },
    profileImage:{
        width:100,
        height:100,
        borderRadius:100,
        borderWidth:3,
        borderColor:theme.colors.white
    },
    nameAndBioView:{
        alignItems:'center',
        marginTop:10
    },
    userFullName:{
        fontFamily:'Bold',
        fontSize:theme.sizes.h2
    },
    userBio:{
        fontFamily:'Medium',
        fontSize:theme.sizes.header,
        color:theme.colors.gray,
        marginTop:4
    },
    countsView:{
        flexDirection:'row',
        marginTop:20,
    },
    countView:{
        flex:1,
        alignItems:'center'
    },
    countNum:{
        fontFamily:'Bold',
        fontSize:theme.sizes.h3
    },
    countText:{
        fontFamily:'Medium'
    },
    interactButtonsView:{
        flexDirection:'row',
        marginTop:10,
        paddingHorizontal:10
    },
    interactButton:{
        flex:1,
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:theme.colors.primary,
        margin:5,
        borderRadius:4
    },
    interactButtonText:{
        fontFamily:'Bold',
        color:theme.colors.white,
        fontSize:18,
        paddingVertical:6
    },
    profileContentButtonsView:{
        flexDirection:'row',
        borderTopWidth:2,
        borderTopColor:theme.colors.primary
    },
    showContentButton: {
        flex:1,
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: theme.colors.black
    },
    showContentButtonText:{
        fontFamily:'Medium',
        fontSize:14
    }
})