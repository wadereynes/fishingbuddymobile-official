import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActionSheetIOS
} from 'react-native';
import { Image } from 'react-native-elements';
import * as Icon from "@expo/vector-icons";
import { theme } from '../../constants';
import { FishInfoCard } from '../discover/FishInfoCard';

export const ViewPost = props => {
    const updatePostOptions = ['Cancel', 'Update post', 'Delete post'];
    return (
        <View>
            <View style={styles.post}>
                {/* Post Header */}
                <View style={styles.postHeader}>
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        source={{ uri: props.post.authorAvatar }}
                    />
                    <View style={{ flex: 1, paddingHorizontal: 10 }}>
                        <Text style={{ fontFamily: 'Bold', fontSize: 18 }}>
                            { props.post.author }
                        </Text>
                        <Text style={{ fontFamily: 'Regular' }}>
                            { props.post.authorTitle }
                        </Text>
                    </View>
                    <TouchableOpacity 
                        style={{ paddingHorizontal: 6 }} 
                        onPress={()=>{
                            ActionSheetIOS.showActionSheetWithOptions(
                                {
                                    title:'Do you want to...',
                                    options: updatePostOptions,
                                    cancelButtonIndex: 0,
                                    userInterfaceStyle: 'dark'
                                },
                                buttonIndex => {
                                    if (buttonIndex === 0) {
                                        // cancel action
                                    } 
                                    else if (buttonIndex === 2){
                                        console.log('deleting this post...');
                                    }
                                }
                            );
                        }}
                    >
                        <Icon.Feather name='more-horizontal' size={24} />
                    </TouchableOpacity>
                </View>
                {/* Post Content */}
                <View style={{ paddingHorizontal: 6 }}>
                    {/* Post Content Text */}
                    <Text style={{ fontFamily: 'Medium' }}>
                    { props.post.description }
                    </Text>
                    {/* Post Content Image */}
                    <Image
                        style={styles.postContentImage}
                        source={{
                        uri: props.post.image
                        }}
                    />
                    {
                        props.post.fish || props.post.catch ?
                            <FishInfoCard fish={props.post.fish ? props.post.fish : props.post.catch}/>
                        : null
                    }
                    
                </View>
                {/* Interactions Bar */}
                <View style={styles.interactionBar}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '35%' }}>
                            <Icon.FontAwesome name='thumbs-up' size={18} color='#ffd400' />
                            <Text style={styles.interactionText}>0 Likes</Text>
                        </View>
                        <Text style={{...styles.interactionText, width: '35%'}}>0 comments</Text>
                        <Text style={{...styles.interactionText, width: '30%'}}>0 shares</Text>
                    </View>
                </View>
                {/* Interacts Button */}
                <View
                    style={{ flexDirection: 'row', marginTop: 10, marginBottom: 4 }}
                >
                    <TouchableOpacity style={styles.interactionButton}>
                        <Icon.Feather name='thumbs-up' size={24} />
                        <Text style={{ marginLeft: 6, fontFamily: 'Regular' }}>
                            Like
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionButton}>
                        <Icon.Feather name='message-square' size={24} />
                        <Text style={{ marginLeft: 6, fontFamily: 'Regular' }}>
                            Comment
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionButton}>
                        <Icon.Feather name='share-2' size={24} />
                        <Text style={{ marginLeft: 6, fontFamily: 'Regular' }}>
                            Share
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        backgroundColor: '#fff',
        width: theme.dimensions.width * 0.90,
    },
    postHeader: { 
        padding: 6, 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    postContentImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginTop: 10,
    },
    interactionBar: {
        backgroundColor: '#fafafa',
        height: 40,
        marginHorizontal: 20,
        marginTop: -20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    interactionText: {
        fontFamily: 'Regular',
        color: '#000',
        marginLeft: 4,
    },
    interactionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
    },
});
