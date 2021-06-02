import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import Axios from 'axios';

import { DiscoverCard } from '../../components/discover/DiscoverCard';
import { NewsCard } from '../../components/discover/NewsCard';
import { theme } from '../../constants';
import { FlatList } from 'react-native-gesture-handler';

export const DiscoverScreen = props => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        getLatestNews();
    }, []);

    const getLatestNews = async() => {
        await Axios.get('https://us-central1-fishingbuddy-web.cloudfunctions.net/app/api/news').then(({ data }) =>
        {
            setNews(data);
        });
    }
    
    return(
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                backgroundColor:theme.colors.white,
                paddingHorizontal:15
            }}
        >
            <View style={{
                flexDirection:"row",
                width:"100%",
                marginTop:40,
                alignItems:"center"
            }}>
                <View style={{
                    width:"50%"
                }}>
                    <Text style={{
                        fontFamily:"Bold",
                        fontSize:22
                    }}>Discover</Text>
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <DiscoverCard
                    src={require('../../assets/images/discover-marine-life.jpg')}
                    name="Marine Life"
                    onPress={()=>props.navigation.navigate('MarineLife')}
                    description="Explore the vast local marine life and enjoy its beauty."
                />
                <DiscoverCard
                    src={require('../../assets/images/discover-fishing-hotspots.jpg')}
                    name="Fishing Hotspots"
                    onPress={()=>props.navigation.navigate('FishingHotspots')}
                    description="Locate the best place to bait the bigger fish."
                />
                <DiscoverCard
                    src={require('../../assets/images/discover-fishing-laws.jpg')}
                    name="Fishing Laws"
                    onPress={()=>props.navigation.navigate('FishingLaws')}
                    description="Know more about local fishing laws in the Philippines"
                />
                <DiscoverCard
                    src={require('../../assets/images/discover-fishing-techniques.jpg')}
                    name="Fishing Techniques"
                    onPress={()=>props.navigation.navigate('FishingTechniques')}
                    description="Learn how to set up your gear so you'll always be ready for your next catch"
                />

            </ScrollView>


                <View style={{
                    flexDirection:"row",
                    marginTop:10,
                    marginBottom:10,
                    alignItems:"center"
                }}>
                    <Text style={{
                        fontFamily:"Bold",
                        fontSize:20
                    }}>
                        News
                    </Text>
                </View>

                <ScrollView showsHorizontalScrollIndicator={false}>
                    <FlatList
                        data={news}
                        renderItem={({ item }) => (
                            <NewsCard news={item} /> 
                        )}
                    />
                </ScrollView>

        </ScrollView>
    );
}