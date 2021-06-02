import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../constants';
import Axios from 'axios';

import * as Icon from "@expo/vector-icons";
import { Header } from '../../components/common';
import { FishInfoCard } from '../../components/discover/FishInfoCard';
import { ScrollView } from 'react-native-gesture-handler';

export const MarineLifeScreen = props => {
    const [fishList, setFishList] = useState([]);
    console.log(fishList);

    useEffect(() => {
        getFishList();
    }, []);

    const getFishList = async() => {
        await Axios.get('https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/fishlist').then(({ data }) =>
        {
            setFishList(data);
        });
    }

    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Header name={'Marine Life'} fontSize={18} icon={'keyboard-backspace'} navigation={props.navigation}/>
                <FlatList
                        data={fishList}
                        renderItem={({ item }) => (
                            <FishInfoCard fish={item}/>
                        )}
                    />
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