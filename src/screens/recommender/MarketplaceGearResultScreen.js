import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../../constants';
import axios from "axios";
import * as Icon from "@expo/vector-icons";
import ProductItem from '../../components/marketplace/ProductItem';



export const MarketplaceGearResultScreen = props => {
    const deliveryAddress = props.route.params.deliveryAddress;
    console.log(rodProducts);

    const [rodProducts, setRodProducts] = useState();
    const [reelProducts, setReelProducts] = useState();
    const [lureProducts, setLureProducts] = useState();
    const [braidlineProducts, setBraidlineProducts] = useState();
    const [leaderlineProducts, setLeaderlineProducts] = useState();

    useEffect(() => {
        axios.get('https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/userProducts/' + props.route.params.fishingGear.rodName.toString() + '/rod/' + deliveryAddress.city.toString() + '/' + deliveryAddress.lat.toString() + '/' + deliveryAddress.lng.toString() ).then(({ data }) => { setRodProducts(data) });
        axios.get('https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/userProducts/' + props.route.params.fishingGear.reelName.toString() + '/reel/'  + deliveryAddress.city.toString() + '/' + deliveryAddress.lat.toString() + '/' + deliveryAddress.lng.toString()).then(({ data }) => { setReelProducts(data) });
        axios.get('https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/userProducts/' + props.route.params.fishingGear.lureName.toString() + '/lure/' + deliveryAddress.city.toString() + '/' + deliveryAddress.lat.toString() + '/' + deliveryAddress.lng.toString()).then(({ data }) => { setLureProducts(data) });
        axios.get('https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/userProducts/' + props.route.params.fishingGear.braidlineName.toString() + '/braidline/' + deliveryAddress.city.toString() + '/' + deliveryAddress.lat.toString() + '/' + deliveryAddress.lng.toString()).then(({ data }) => { setBraidlineProducts(data) });
        axios.get('https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/userProducts/' + props.route.params.fishingGear.leaderlineName.toString() + '/leaderline/' + deliveryAddress.city.toString() + '/' + deliveryAddress.lat.toString() + '/' + deliveryAddress.lng.toString()).then(({ data }) => { setLeaderlineProducts(data) });
    }, []);


    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '10%', marginTop: 20,}}>
                        <TouchableOpacity style={styles.smallButton} onPress={()=> props.navigation.goBack()}>
                            <Icon.MaterialCommunityIcons style={styles.headerIcon} name={'keyboard-backspace'} size={25} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '90%'}}>
                        <Text style={{ fontFamily:'Bold', fontSize: 20, marginTop: 10, }}>Available at our</Text>
                        <Text style={{ fontFamily:'Bold', fontSize: 30, }}>Marketplace</Text>
                    </View>
                </View>
                <ScrollView style={{ marginLeft: 10}}>
                    <Text style={{ fontFamily:'Bold', fontSize: 20, marginTop: 10, }}>Rod</Text>
                    <Text style={{ fontFamily:'Medium', fontSize: 15, marginTop: 10 }}>{ props.route.params.fishingGear.rodName}</Text>

                    <FlatList
                        data={rodProducts}
                        horizontal={true}
                        renderItem={({ item }) => (
                            <ProductItem 
                                image={item.urlPhoto}
                                title={item.title}
                                category={item.category}
                                price={item.price} 
                                location={item.address}
                                navigation={props.navigation}
                                onSelect={()=>props.navigation.navigate('ProductDetail', {
                                    screen: 'ProductDetail',
                                    productId: item.productId,
                                    productTitle: item.title,
                                })}
                            /> 
                        )}
                    />
                    <Text style={{ fontFamily:'Bold', fontSize: 20, marginTop: 10 }}>Reel</Text>
                    <Text style={{ fontFamily:'Medium', fontSize: 15, marginTop: 10 }}>{ props.route.params.fishingGear.reelName}</Text>
                    <FlatList
                        data={reelProducts}
                        horizontal={true}
                        renderItem={({ item }) => (
                            <ProductItem 
                                image={item.urlPhoto}
                                title={item.title}
                                category={item.category}
                                price={item.price} 
                                navigation={props.navigation}
                                location={item.address}
                                onSelect={()=>props.navigation.navigate('ProductDetail', {
                                    screen: 'ProductDetail',
                                    productId: item.productId,
                                    productTitle: item.title,
                                })}
                            /> 
                        )}
                    />
                    <Text style={{ fontFamily:'Bold', fontSize: 20, marginTop: 10, }}>Lure</Text>
                    <Text style={{ fontFamily:'Medium', fontSize: 15, marginTop: 10 }}>{ props.route.params.fishingGear.lureName}</Text>
                    <FlatList
                        data={lureProducts}
                        horizontal={true}
                        renderItem={({ item }) => (
                            <ProductItem 
                                image={item.urlPhoto}
                                title={item.title}
                                category={item.category}
                                price={item.price} 
                                navigation={props.navigation}
                                location={item.address}
                                onSelect={()=>props.navigation.navigate('ProductDetail', {
                                    screen: 'ProductDetail',
                                    productId: item.productId,
                                    productTitle: item.title,
                                })}
                            /> 
                        )}
                    />
                    <Text style={{ fontFamily:'Bold', fontSize: 20, marginTop: 10, }}>Braidline</Text>
                    <Text style={{ fontFamily:'Medium', fontSize: 15, marginTop: 10 }}>{ props.route.params.fishingGear.braidlineName}</Text>
                    <FlatList
                        data={braidlineProducts}
                        horizontal={true}
                        renderItem={({ item }) => (
                            <ProductItem 
                                image={item.urlPhoto}
                                title={item.title}
                                category={item.category}
                                price={item.price} 
                                navigation={props.navigation}
                                location={item.address}
                                onSelect={()=>props.navigation.navigate('ProductDetail', {
                                    screen: 'ProductDetail',
                                    productId: item.productId,
                                    productTitle: item.title,
                                })}
                            /> 
                        )}
                    />
                    <Text style={{ fontFamily:'Bold', fontSize: 20, marginTop: 10, }}>Leaderline</Text>
                    <Text style={{ fontFamily:'Medium', fontSize: 15, marginTop: 10 }}>{ props.route.params.fishingGear.leaderlineName}</Text>
                    <FlatList
                        data={leaderlineProducts}
                        horizontal={true}
                        renderItem={({ item }) => (
                            <ProductItem 
                                image={item.urlPhoto}
                                title={item.title}
                                category={item.category}
                                price={item.price} 
                                navigation={props.navigation}
                                location={item.address}
                                onSelect={()=>props.navigation.navigate('ProductDetail', {
                                    screen: 'ProductDetail',
                                    productId: item.productId,
                                    productTitle: item.title,
                                })}
                            /> 
                        )}
                    />
                </ScrollView>
            </View>
            
        </View>

    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'flex-start',
        backgroundColor:theme.colors.white
    },
    wrapper:{
        paddingHorizontal:10,
        marginTop:30,
    }
});