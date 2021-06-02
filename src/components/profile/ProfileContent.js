import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Image, Divider  } from 'react-native-elements';
import { theme } from '../../constants';
import * as Icon from "@expo/vector-icons";

import { ActionButton } from '../../components/profile/ActionButton';
import { GearSetup } from './GearSetup';
import ProductItem from '../marketplace/ProductItem';

export const ProfileContent = props => {
    const [showContent, setShowContent] = useState('Posts');
    const [fishingGearsWithKey, setFishingGearsWithKey] = useState();
    const [hasFishingGears, setHasFishingGears] = useState(false);

    const [postsWithKey, setPostsWithKey] = useState();
    const [hasPosts, setHasPosts] = useState(false);
    const [hasProducts, setHasProducts] = useState(false);


    useEffect(() => {
        if(props.user){
            if(props.user.fishingGears){
                setFishingGearsWithKey(Object.fromEntries(Object.entries(props.user.fishingGears)));
                setHasFishingGears(true);
            }
            if(props.user.posts){
                setPostsWithKey(Object.fromEntries(Object.entries(props.user.posts)));
                setHasPosts(true);
            }
            if(props.products.length != 0){
                setHasProducts(true);
            }
        }
    }, [props.user.fishingGears, props.user.posts])

    
    const Posts = props => {
        const imgWidth = Dimensions.get('screen').width * 0.33333;
        if(hasPosts){
            return (
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'flex-start',
                        }}
                    >
                        { 
                            Object.keys(postsWithKey).sort().reverse().map((d, key) => 
                                
                                <TouchableOpacity onPress={() => props.navigation.navigate('ViewPost', { post: postsWithKey[d] } )}>
                                    <Image
                                        style={{ width: imgWidth, height: imgWidth }}
                                        source={{
                                            uri: postsWithKey[d].image
                                        }}
                                    />
                                </TouchableOpacity>

                                
                            )
                        }
                    </View>
                </View>
            );
        }
        else{
            return (
                <View>
                    <View style={{ flex: 1, alignItems: 'center',justifyContent: 'center', width: '100%' }}>
                        <View style={{ alignItems:'center', marginTop: 40,  width:'100%'}}>
                            <Image 
                                source={require('../../assets/icons/fishermen.png')} 
                                style={{ width: 100, height: 100, marginHorizontal: 50}}
                                transition={false}
                            />
                            <Text style={{ fontFamily: 'Bold', fontSize: 14, marginVertical: 10, marginHorizontal: 20 }}>You have no posts</Text>
                        </View>
                    </View>
                </View>
            );
        }
        
    }
    
    const Gear = props => {
        if(hasFishingGears){
            return (
                <View>
                    <View style={{ flex: 1, alignItems: 'center',justifyContent: 'center', width: '100%' }}>
                        { 
                            Object.keys(fishingGearsWithKey).map((d, key) => 
                                <GearSetup fishingGear={fishingGearsWithKey[d]} navigation={props.navigation} firebaseKey={d} key={key}/>
                            )
                        }
                        <View style={{ marginTop: 30, width: theme.dimensions.width * 0.6}}>
                            <ActionButton name={'Add your gear'} onPress={() => props.navigation.navigate('ManageGear', { action: 'Add', fishingGear: null, user: props.user  })}/>
                        </View>
                        
                        <View style={{ marginBottom: 30, justifyContent:'center'}}><Divider style={{ backgroundColor: theme.colors.primary }} />
                        <ActionButton name={'Recommend me a gear'} onPress={() => props.navigation.navigate('RecommendGear', { fishingGearTypes: props.fishingGearTypes , origin: 'Profile' })} outline/>
                        </View>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View>
                    <View style={{ flex: 1, alignItems: 'center',justifyContent: 'center', width: '100%' }}>
                        <View style={{ alignItems:'center', marginTop: 40,  width:'100%'}}>
                            <Image 
                                source={require('../../assets/icons/fishing-rod.png')} 
                                style={{ width: 100, height: 100, marginHorizontal: 50}}
                                transition={false}
                            />
                            <Text style={{ fontFamily: 'Bold', fontSize: 14, marginVertical: 10, marginHorizontal: 20 }}>You have no gear setup</Text>
                        </View>

                        <View style={{ marginTop: 30, width: theme.dimensions.width * 0.6}}>
                            <ActionButton name={'Add your gear'} onPress={() => props.navigation.navigate('ManageGear', { action: 'Add', fishingGear: null, user: props.user  })}/>
                        </View>
                        
                        <View style={{ marginBottom: 30, justifyContent:'center'}}><Divider style={{ backgroundColor: theme.colors.primary }} />
                            <ActionButton name={'Recommend me a gear'} onPress={() => props.navigation.navigate('RecommendGear', { fishingGearTypes: props.fishingGearTypes , origin: 'Profile' })} outline/>
                        </View>
                    </View>
                </View>
            );
        }
    }
    
    const Catch = props => {
        const imgWidth = Dimensions.get('screen').width * 0.33333;
        return(
            <View>
                <View
                    style={{
                        flex: 1, 
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%'
                    }}
                >
                    <View style={{ alignItems:'center', marginTop: 40,  width:'100%'}}>
                        <Image source={require('../../assets/icons/fishing.png')} style={{ width: 100, height: 100, marginHorizontal: 50}} transition={false}/>
                        <Text style={{ fontFamily: 'Bold', fontSize: 14, marginVertical: 10, marginHorizontal: 20 }}>You have no caught fish</Text>
                    </View>
                    
                    <View style={{ marginBottom: 30, justifyContent:'center'}}>
                        <ActionButton name={'Recommend me a catch'} onPress={() => props.navigation.navigate('RecommendCatch', { fishingGearTypes: props.fishingGearTypes })} outline/>
                    </View>
                </View>
            </View>
        );
    }

    const Trip = props => {
        const imgWidth = Dimensions.get('screen').width * 0.33333;
        return (
            <View>
                <View
                    style={{
                        flex: 1, 
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%'
                    }}
                >
                    <View style={{ alignItems:'center', marginTop: 40,  width:'100%'}}>
                        <Image source={require('../../assets/icons/boat.png')} style={{ width: 100, height: 100, marginHorizontal: 50}} transition={false}/>
                        <Text style={{ fontFamily: 'Bold', fontSize: 14, marginVertical: 10, marginHorizontal: 20 }}>You haven't gone to a fishing trip</Text>
                    </View>
                    <View style={{ marginTop: 30, width: theme.dimensions.width * 0.6}}>
                        <ActionButton name={'Plan a trip'} onPress={() => props.navigation.navigate('Trip', { action: 'Add' })}/>
                    </View>
                    
                </View>
            </View>
        );
    }

    const Products = props => {
        if(hasProducts){
            return(
                
                <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
                    {props.products.map((product, index) => 
                        <ProductItem 
                            image={product.urlPhoto}
                            title={product.title}
                            category={product.category}
                            price={product.price} 
                            navigation={props.navigation}
                            onSelect={()=>props.navigation.navigate('ProductDetail', {
                                screen: 'ProductDetail',
                                productId: product.productId,
                                productTitle: product.title,
                            })}
                        /> 
                    )}
                </View>
            )
        }
        return (
            <View>
                <View style={{ flex: 1, alignItems: 'center',justifyContent: 'center', width: '100%' }}>
                    <View style={{ alignItems:'center', marginTop: 40,  width:'100%'}}>
                        <Image 
                            source={require('../../assets/icons/groceries.png')} 
                            style={{ width: 100, height: 100, marginHorizontal: 50}}
                            transition={false}
                        />
                        <Text style={{ fontFamily: 'Bold', fontSize: 14, marginVertical: 10, marginHorizontal: 20 }}>No products listed</Text>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={{ marginTop: 20 }}>
            <View style={styles.profileContentButtonsView}>
                { props.user.type != "Consumer" ?
                    <TouchableOpacity
                        style={{
                            ...styles.showContentButton,
                            borderBottomWidth: showContent === 'Posts' ? 2 : 0,
                        }}
                        onPress={() => setShowContent('Posts')}
                        >
                            <Text style={styles.showContentButtonText}>POSTS</Text>
                            
                    </TouchableOpacity>
                    : null
                }   
                { props.user.type === "Fisherman" || props.user.type === "Tackle shop Owner" ?
                    
                    <TouchableOpacity
                        style={{
                            ...styles.showContentButton,
                            borderBottomWidth: showContent === 'Products' ? 2 : 0,
                        }}
                        onPress={() => setShowContent('Products')}
                    >
                        <Text style={styles.showContentButtonText}>PRODUCTS</Text>
                    </TouchableOpacity>
                    : 
                    null
                }
                { props.user.type == "Hobbyist"  ?
                    <TouchableOpacity
                        style={{
                            ...styles.showContentButton,
                            borderBottomWidth: showContent === 'Gear' ? 2 : 0,
                        }}
                        onPress={() => setShowContent('Gear')}
                        >
                            <Text style={styles.showContentButtonText}>GEAR</Text>
                    </TouchableOpacity>
                    :
                    null
                }
                { props.user.type === 'Hobbyist' || props.user.type === 'Fisherman' ? 
                    <TouchableOpacity
                        style={{
                            ...styles.showContentButton,
                            borderBottomWidth: showContent === 'Catch' ? 2 : 0,
                        }}
                        onPress={() => setShowContent('Catch')}
                    >
                        <Text style={styles.showContentButtonText}>CATCH</Text>
                    </TouchableOpacity>
                    :
                    null
                }
                
                { props.user.type == "Hobbyist" ?
                    <TouchableOpacity
                        style={{
                            ...styles.showContentButton,
                            borderBottomWidth: showContent === 'Trip' ? 2 : 0,
                        }}
                        onPress={() => setShowContent('Trip')}
                    >
                        <Text style={styles.showContentButtonText}>TRIP</Text>
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
            {
                showContent === 'Posts' ? 
                (
                    <Posts photos={new Array(13).fill(1)} navigation={props.navigation} />
                ) : showContent === 'Gear' ? 
                (
                    <Gear photos={new Array(13).fill(1)} navigation={props.navigation} fishingGears={props.fishingGears} fishingGearTypes={props.fishingGearTypes} user={props.user} />
                ) : showContent === 'Catch' ? 
                (
                    <Catch photos={new Array(23).fill(1)} navigation={props.navigation} />
                ) : showContent === 'Products' ?
                (
                    <Products products={props.products} navigation={props.navigation}/>
                ):
                (
                    <Trip photos={new Array(23).fill(1)} navigation={props.navigation} />
                )
                
            }
        </View> 
    );
}

const styles = StyleSheet.create({
    coverImage: {
        height:300,
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
        paddingVertical: 1,
        borderBottomColor: theme.colors.primary
    },
    showContentButtonText:{
        fontFamily:'Bold',
        color:theme.colors.primary,
        fontSize:13,
        paddingVertical:10,
    },
    smallButton: {
        alignItems:"center",
        justifyContent:'center',
        paddingHorizontal:10,
        flexDirection:'row',
    },
    buttonWithIcon:{
        display:'flex',
        marginHorizontal:7,
        marginVertical:5,
        paddingVertical:10,
        paddingHorizontal:20,
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