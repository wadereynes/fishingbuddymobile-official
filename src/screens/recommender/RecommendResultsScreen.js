import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { theme } from '../../constants';
import Axios from 'axios';

import { Header } from '../../components/common';
import { ScrollView } from 'react-native-gesture-handler';
import { RecommendedGear } from '../../components/profile/RecommendedGear';
import ProductItem from '../../components/marketplace/ProductItem';

export const RecommendResultsScreen = props => {

    const [recommendationResult, setRecommendationResult] = useState([]);
    const deliveryAddress = props.route.params.deliveryAddress;
    console.log(deliveryAddress);
    
    useEffect(() => {
        getRecommendation();
    }, []);

    const getRecommendation = async() => {
        
        await Axios.get(props.route.params.endpoint).then(({ data }) =>
        {
            setRecommendationResult(data);
        });
    }

    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Header name={'You may like these'} fontSize={20} icon={'keyboard-backspace'} navigation={props.navigation}/>
                <View >
                { props.route.params.recommendType === 'catch' ?
                    <View style={{ flex: 1,}}>
                        <FlatList
                            numColumns={2}
                            data={recommendationResult}
                            renderItem={({ item }) => (
                                <ProductItem 
                                    image={item.urlPhoto}
                                    title={item.title}
                                    category={item.category}
                                    price={item.price} 
                                    navigation={props.navigation}
                                    deliveryAddress={deliveryAddress}
                                    onSelect={()=>props.navigation.navigate('ProductDetail', {
                                        screen: 'ProductDetail',
                                        productId: item.productId,
                                        productTitle: item.title,
                                    })}
                                /> 
                            )}
                        />
                    </View>
                    :
                    <View style={{ flex: 1, paddingBottom: 100 }}>
                        <FlatList
                            data={recommendationResult}
                            renderItem={({ item }) => (
                                <RecommendedGear 
                                    fishingGear={item} 
                                    navigation={props.navigation}
                                    deliveryAddress={deliveryAddress}
                                />
                            )}
                        />
                    </View>
                }
                </View>
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
        paddingHorizontal:5,
        marginTop:30,
    },
    smallButton: {
        alignItems:"center",
        justifyContent:'center',
        padding:10,
        flexDirection:'row',
        backgroundColor:theme.colors.gray4,
        borderRadius:23,
        shadowColor: 'black',
        shadowOpacity: 0.19,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 3,
    },
});