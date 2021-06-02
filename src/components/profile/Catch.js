import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Divider, Card, ListItem, Button  } from 'react-native-elements';
import * as Icon from "@expo/vector-icons";
import { theme } from '../../constants';


export const Catch = props => {

    return(
        <Card containerStyle={styles.containerStyle}>
            <View style={{ flexDirection:'row'}}>
                <Text style={{ fontFamily:'Bold', width:'90%',}}>{props.fishingGear.setupName}</Text>
                <TouchableOpacity style={styles.smallButton} onPress={() => props.navigation.navigate('ManageGear', { action: 'Update', fishingGear: props.fishingGear, firebaseKey: props.firebaseKey })}>
                    <Icon.MaterialIcons style={styles.headerIcon} name={'edit'} size={18} color={theme.colors.primary} />
                </TouchableOpacity>
            </View>
            <Card.Divider/>
            <View style={{ flexDirection:'row' }}>
                <View style={{ flexDirection:'column', width:'70%' }}>
                    
                    <View style={{ flexDirection:'row', marginVertical: 2 }}> 
                        <Image source={require('../../assets/icons/outline/fishing-rod-outline.png')} style={{ width: 16, height: 16}} />
                        <Text style={styles.gearText}>{props.fishingGear.rod}</Text>
                    </View>
                    <View style={{ flexDirection:'row' }}> 
                        <Image source={require('../../assets/icons/outline/fishing-reel-outline.png')} style={{ width: 16, height: 16}} />
                        <Text style={styles.gearText}>{props.fishingGear.reel}</Text>
                    </View>     
                    <View style={{ flexDirection:'row' }}> 
                        <Image source={require('../../assets/icons/outline/bait.png')} style={{ width: 16, height: 16}} />
                        <Text style={styles.gearText}>{props.fishingGear.lure}</Text>
                    </View>     
                    <View style={{ flexDirection:'row' }}> 
                        <Image source={require('../../assets/icons/outline/fishing-line-outline.png')} style={{ width: 16, height: 16}} />
                        <Text style={styles.gearText}>{props.fishingGear.braidline}</Text>
                    </View>      
                    <View style={{ flexDirection:'row' }}> 
                        <Image source={require('../../assets/icons/outline/fishing-line2-outline.png')} style={{ width: 16, height: 16}} />
                        <Text style={styles.gearText}>{props.fishingGear.leaderLine}</Text>
                    </View>                      
                </View>
                <View style={{ flexDirection:'column', width:'30%' }}>
                    { props.fishingGear.selectedShorecasting ? 
                        <View style={{ flexDirection:'row', marginVertical: 2 }}> 
                            <Image source={require('../../assets/icons/outline/shorecasting.png')} style={{ width: 16, height: 16}} />
                            <Text style={styles.gearText}>Shorecasting</Text>
                        </View>
                        :
                        <View style={{ flexDirection:'row', marginVertical: 2 }}> 
                            <Image source={require('../../assets/icons/outline/jigging.png')} style={{ width: 16, height: 16}} />
                            <Text style={styles.gearText}>Jigging</Text>
                        </View>
                    }
                    { props.fishingGear.selectedSmallCatchSize ? 
                        <View style={{ flexDirection:'row' }}> 
                            <Image source={require('../../assets/icons/outline/small-fish.png')} style={{ width: 16, height: 16}} />
                            <Text style={styles.gearText}>Small Catch</Text>
                        </View>   
                        : props.fishingGear.selectedMediumCatchSize ? 
                        <View style={{ flexDirection:'row' }}> 
                            <Image source={require('../../assets/icons/outline/medium-fish.png')} style={{ width: 16, height: 16}} />
                            <Text style={styles.gearText}>Medium Catch</Text>
                        </View>  
                        :
                        <View style={{ flexDirection:'row' }}> 
                            <Image source={require('../../assets/icons/outline/big-fish.png')} style={{ width: 16, height: 16}} />
                            <Text style={styles.gearText}>Large Catch</Text>
                        </View> 
                    }
                </View>
            </View>
            
        </Card>
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
