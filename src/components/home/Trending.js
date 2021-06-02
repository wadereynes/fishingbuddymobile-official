import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';


import { Button, Heading } from '../common/';
import { ProductCard } from '../marketplace/ProductCard';

//static content
import { gear } from '../../assets/icons';


export const Trending = props => {
    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
            
                <Heading 
                    heading={{
                        headingTitle:'Trending'
                    }}/>
                <View style={{width:"50%", alignItems:"flex-end"}}>
                    <Button navigation={props.navigation}
                        button={{ 
                            buttonName:'More',
                            buttonNav:'Detail'
                        }}
                    />
                </View>
            </View>
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <ProductCard 
                        navigation={ props.navigation }
                        card={{
                            productName:gear.lure1.imageName,
                            productPrice:gear.lure1.price,
                            productImage:gear.lure1.uri,
                            productCategory:gear.lure1.category
                        }}
                    />
                    <ProductCard 
                        navigation={ props.navigation }
                        card={{
                            productName:gear.rod1.imageName,
                            productPrice:gear.rod1.price,
                            productImage:gear.rod1.uri,
                            productCategory:gear.rod1.category
                        }}
                    />
                    <ProductCard 
                        navigation={ props.navigation }
                        card={{
                            productName:gear.rod2.imageName,
                            productPrice:gear.rod2.price,
                            productImage:gear.rod2.uri,
                            productCategory:gear.rod2.category
                        }}
                    />
                    <ProductCard 
                        navigation={ props.navigation }
                        card={{
                            productName:gear.reel1.imageName,
                            productPrice:gear.reel1.price,
                            productImage:gear.reel1.uri,
                            productCategory:gear.reel1.category
                        }}
                    />
                    <ProductCard 
                        navigation={ props.navigation }
                        card={{
                            productName:gear.reel2.imageName,
                            productPrice:gear.reel2.price,
                            productImage:gear.reel2.uri,
                            productCategory:gear.reel2.category
                        }}
                    />
                    
                </ScrollView>  
        </View>
        
    );
}

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:"row",
        paddingHorizontal:20,
        width:"100%",
        alignItems:"center",
    },
    container:{
        paddingTop: 5,
        paddingBottom: 10
    }
})
