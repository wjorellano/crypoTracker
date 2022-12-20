import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CoinMarketItem = ({item}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText }>{item.name}</Text>
            <Text style={styles.price_usd }>{item.price_usd}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0,0,0,0.1)",
        borderColor: "#000",
        borderWidth: 1,
        padding: 16,
        marginRight: 8,
    },
    titleText: {
        color: "#fff",
        fontWeight: "bold",
    },
    price_usd: {
        color: "#fff",
    },
});


export default CoinMarketItem;