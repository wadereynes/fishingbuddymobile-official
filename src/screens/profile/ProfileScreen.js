import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, RefreshControl } from 'react-native';

import * as Icon from "@expo/vector-icons";

import { theme } from '../../constants';
import { firebase } from '../../config/firebase';

import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { ProfileContent } from '../../components/profile/ProfileContent';
import { Loading } from '../../components/common/Loading';
import Axios from 'axios';


export const ProfileScreen = props => {
    
    const [userProfile, setUserProfile] = useState();
    const [fishingGearTypes, setFishingGearTypes] = useState();
    const [products, setProducts] = useState([]);
    const currentUserFirebase = firebase.auth().currentUser;



    useEffect(() => {
        getUserDetails();
        if(props.route.params){
            if(userProfile != props.route.params.userProfile){
                console.log('userProfile has changes...');
                updateUserProfile(props.route.params.userProfile);
            }
        }
        fetchProductsByUser();
    }, []);

    const getUserDetails = async() => {
        var currentUser = firebase.auth().currentUser;
        if(currentUser){
            await firebase.database().ref('user/' + currentUser.uid).once('value', snapshot => { updateUserProfile(snapshot.val()) });
        }
    }

    const fetchProductsByUser = async() => {
        await Axios.get('https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/sellerproducts/'+currentUserFirebase.uid).then(({ data }) =>
        {
            setProducts(data);
        });
    }

    useEffect(() => {
        getFishingGearSettings();
    }, []);


    const getFishingGearSettings = async() => {
        await firebase.database().ref('hobbyist/').once('value', snapshot => {setFishingGearTypes(snapshot.val());
        });
    }


    const updateUserProfile = (userProfile) => { 
        setUserProfile(userProfile);
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getUserDetails();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
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
>
                <View>
                    <Image style={styles.coverImage} source={{ uri: userProfile.coverPhoto}} PlaceholderContent={<ActivityIndicator />}/>
                    <ProfileHeader navigation={props.navigation} user={userProfile} />
                    <ProfileContent navigation={props.navigation} user={userProfile} fishingGearTypes={fishingGearTypes} products={products}/>
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
    coverImage: {
        height: 240,
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
