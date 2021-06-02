import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, ActivityIndicator, Image, RefreshControl, ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';

import Axios from 'axios';

import { HomeHeader } from '../../components/home/HomeHeader';
import { Trending } from '../../components/home/Trending';
import { Post } from '../../components/home/Post';
import { Loading } from '../../components/common/Loading';

import { theme } from '../../constants';
import { firebase } from '../../config/firebase';

export const HomeScreen = props => {
    const [userProfile, setUserProfile] = useState();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async() => {
        var currentUser = firebase.auth().currentUser;
        if(currentUser){
            await firebase.database().ref('user/' + currentUser.uid).once('value', snapshot => { setUserProfile(snapshot.val()) });
        }
    }

    useEffect(() => {
        getLatestPosts();
    }, []);

    const getLatestPosts = async() => {
        await Axios.get('https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/newsfeed').then(({ data }) =>
        {
            setPosts(data);
        });
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        getLatestPosts();
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    return (
        <View style={{
            flex:1,
            alignItems:'center',
            backgroundColor:theme.colors.gray4
        }}>
                { !userProfile ? 
                    <Loading name={'Loading...'}/>
                : 
                    userProfile.isOnboarded ?
                        <View>
                            <HomeHeader navigation={props.navigation} user={userProfile}/>
                            <FlatList
                                data={posts}
                                inverted={true}
                                renderItem={({ item }) => (
                                    <Post post={item} navigation={props.navigation}/> 
                                )}
                            />
                        </View>
                    :
                        props.navigation.replace('Onboarding')
                }
        </View>
    );
}

const styles = StyleSheet.create({
    scrollview:{
        height:100,
    }
})
