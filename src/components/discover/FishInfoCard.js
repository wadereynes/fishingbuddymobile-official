import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { theme } from '../../constants';

export const FishInfoCard = props => {
    return(
        <TouchableOpacity 
            onPress={props.onPress}
            style={{
                backgroundColor:theme.colors.white,
                borderRadius:10,
                marginLeft:2,
                paddingRight: 5,
                paddingVertical: 10,
                
            }}
        >
            { props.fish ? 
                <View style={{ flexDirection:'row'}}>
                    <View style={{ width: '55%'}}>
                        <Image
                            source={{ uri: props.fish.fishImage }}
                            style={styles.image}
                        />
                    </View>
                    <View style={{ width: '45%'}}>
                        <Text style={styles.maintext}>
                            { props.fish.fishCommonName }
                        </Text>
                        <Text style={styles.subtext}>
                            { props.localname ? props.fish.fishLocalName : props.fish.fishScientificName}
                        </Text>
                    </View>
                </View>
            : 
                <View style={{ flexDirection:'row', borderColor: theme.colors.gray4, borderWidth: 2, borderRadius: 23}}>
                    <View style={{ width: '40%'}}>
                        <Image
                            source={require('../../assets/images/fish.png')}
                            style={styles.image2}
                        />
                    </View>
                    <View style={{ width: '60%'}}>
                        <Text style={{...styles.maintext, marginVertical: 20}}>
                            Select a catch type
                        </Text>
                    </View>
                </View>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image:{
        flex: 1,
        width: theme.dimensions.width * 0.5,
        height: theme.dimensions.width * 0.2,
        resizeMode: 'contain'
    },
    image2:{
        width: theme.dimensions.width * 0.4,
        height: theme.dimensions.width * 0.2,
        resizeMode: 'contain'
    },
    maintext:{
        paddingTop: 10,
        fontSize:14,
        marginBottom: 5,
        color: theme.colors.black,
        fontFamily:"Bold",
        elevation: 2,
    },
    subtext:{
        fontSize:12,
        marginBottom: 5,
        color: theme.colors.black,
        fontFamily:"Italic",
        elevation: 2
    }
});