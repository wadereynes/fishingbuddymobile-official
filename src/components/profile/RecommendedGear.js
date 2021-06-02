import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Divider, Card, ListItem, Button  } from 'react-native-elements';
import * as Icon from "@expo/vector-icons";
import { theme } from '../../constants';


export const RecommendedGear = props => {
    const [rankIndex, setRankIndex] = React.useState(props.index+1);
    
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return(
        
            <View style={{ flex: 1}} >
                { props.fishingGear ? 
                <Card containerStyle={styles.containerStyle}>
                    
                    <View style={{ flexDirection:'column' }}>
                        <View style={{ flexDirection:'column', width:'100%' }}>
                            <Text style={{ fontFamily:'Bold', fontSize: 14,}}>GEAR SETUP</Text>
                            <View style={{ flexDirection:'row', marginVertical: 2, paddingLeft: 10 }}> 
                                <Image source={require('../../assets/icons/outline/fishing-rod-outline.png')} style={{ width: 16, height: 16}} />
                                <Text style={styles.gearText}>{props.fishingGear.rodName}</Text>
                            </View>
                            <View style={{ flexDirection:'row', paddingLeft: 10 }}> 
                                <Image source={require('../../assets/icons/outline/fishing-reel-outline.png')} style={{ width: 16, height: 16}} />
                                <Text style={styles.gearText}>{props.fishingGear.reelName}</Text>
                            </View>     
                            <View style={{ flexDirection:'row', paddingLeft: 10 }}> 
                                <Image source={require('../../assets/icons/outline/bait.png')} style={{ width: 16, height: 16}} />
                                <Text style={styles.gearText}>{props.fishingGear.lureName}</Text>
                            </View>     
                            <View style={{ flexDirection:'row', paddingLeft: 10 }}> 
                                <Image source={require('../../assets/icons/outline/fishing-line-outline.png')} style={{ width: 16, height: 16}} />
                                <Text style={styles.gearText}>{props.fishingGear.braidlineName}</Text>
                            </View>      
                            <View style={{ flexDirection:'row', paddingLeft: 10 }}> 
                                <Image source={require('../../assets/icons/outline/fishing-line2-outline.png')} style={{ width: 16, height: 16}} />
                                <Text style={styles.gearText}>{props.fishingGear.leaderlineName}</Text>
                            </View>                      
                        </View>
                        <Text style={{ fontFamily:'Bold', fontSize: 14, paddingTop: 10}}>FISHING MODE </Text>
                        <View style={{ flexDirection:'column', width:'100%' }}>
                            { props.fishingGear.environmentType === 'Shore Casting' ? 
                                <View style={{ flexDirection:'row', marginVertical: 2, paddingLeft: 10}}> 
                                    <Image source={require('../../assets/icons/outline/shorecasting.png')} style={{ width: 16, height: 16}} />
                                    <Text style={styles.gearText}>Shorecasting</Text>
                                </View>
                                :
                                <View style={{ flexDirection:'row', marginVertical: 2, paddingLeft: 10 }}> 
                                    <Image source={require('../../assets/icons/outline/jigging.png')} style={{ width: 16, height: 16}} />
                                    <Text style={styles.gearText}>Jigging</Text>
                                </View>
                            }
                        </View>
                        <Text style={{ fontFamily:'Bold', fontSize: 14, paddingTop: 10}}>EXPECTED CATCH </Text>
                        <View style={{ flexDirection:'column', width:'100%' }}>
                            {    props.fishingGear.catchType === 'Small' ? 
                                <View style={{ flexDirection:'row', paddingLeft: 10 }}> 
                                    <Image source={require('../../assets/icons/outline/small-fish.png')} style={{ width: 16, height: 16}} />
                                    <Text style={styles.gearText}>Small Catch</Text>
                                </View>   
                                : props.fishingGear.catchType === 'Medium' ? 
                                <View style={{ flexDirection:'row', paddingLeft: 10 }}> 
                                    <Image source={require('../../assets/icons/outline/medium-fish.png')} style={{ width: 16, height: 16}} />
                                    <Text style={styles.gearText}>Medium Catch</Text>
                                </View>  
                                :
                                <View style={{ flexDirection:'row', paddingLeft: 10 }}> 
                                    <Image source={require('../../assets/icons/outline/big-fish.png')} style={{ width: 16, height: 16}} />
                                    <Text style={styles.gearText}>Large Catch</Text>
                                </View> 
                            }
                        </View>
                        <Card.Divider/>
                        <View style={{ flexDirection:'row'}}>
                        <Text style={{ fontFamily:'Bold', fontSize: 15,}}>Total Price: ₱{numberWithCommas(props.fishingGear.totalPrice.toFixed(2))} </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: theme.colors.primary,
                                borderRadius: 15,
                                marginTop: 5,
                                alignContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={()=> props.navigation.navigate('MarketplaceGearResults', { fishingGear : props.fishingGear, deliveryAddress: props.deliveryAddress })}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Medium',
                                    fontSize: 10,
                                    color: theme.colors.white,
                                    marginHorizontal: 10,
                                    marginVertical: 5,
                                }}
                            >
                                GO TO MARKETPLACE
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                </Card>
                    :
                    null
                }
            </View>
            
    );
} 

const styles = StyleSheet.create({
    gearText: {
        marginBottom: 2, 
        width: '100%', 
        fontFamily:'Medium', 
        fontSize: 12, 
        paddingVertical: 2, 
        paddingLeft: 5
    },
    containerStyle:{
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: theme.colors.gray2, 
        marginHorizontal: 20, 
        paddingHorizontal:20
    }
});
