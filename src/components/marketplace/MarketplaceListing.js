import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

import { ProductCard } from "./ProductCard";

//static content
import { gear } from "../../assets/icons";

const MarketplaceListing = (props) => {
return (
    <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <LinearGradient
                    colors={["rgba(0,93,160,0.09)", "transparent"]}
                    style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 150,
                    marginTop: 100,
                    top: 0,
                    }}
                />
                <ProductCard
                    navigation={props.navigation}
                    card={{
                    productName: gear.reel2.imageName,
                    productPrice: gear.reel2.price,
                    productImage: gear.reel2.uri,
                    productCategory: gear.reel2.category,
                    }}
                />
                <ProductCard
                    navigation={props.navigation}
                    card={{
                    productName: gear.lure1.imageName,
                    productPrice: gear.lure1.price,
                    productImage: gear.lure1.uri,
                    productCategory: gear.lure1.category,
                    }}
                />
                <ProductCard
                    navigation={props.navigation}
                    card={{
                    productName: gear.rod1.imageName,
                    productPrice: gear.rod1.price,
                    productImage: gear.rod1.uri,
                    productCategory: gear.rod1.category,
                    }}
                />
                <ProductCard
                    navigation={props.navigation}
                    card={{
                    productName: gear.rod2.imageName,
                    productPrice: gear.rod2.price,
                    productImage: gear.rod2.uri,
                    productCategory: gear.rod2.category,
                    }}
                />
                <ProductCard
                    navigation={props.navigation}
                    card={{
                    productName: gear.reel1.imageName,
                    productPrice: gear.reel1.price,
                    productImage: gear.reel1.uri,
                    productCategory: gear.reel1.category,
                    }}
                />
                <ProductCard
                    navigation={props.navigation}
                    card={{
                    productName: gear.reel2.imageName,
                    productPrice: gear.reel2.price,
                    productImage: gear.reel2.uri,
                    productCategory: gear.reel2.category,
                    }}
                />
            </View>
        </View>
    </ScrollView>
);
};

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
    },
    container: {
        paddingTop: 5,
    },
});
export default MarketplaceListing;
