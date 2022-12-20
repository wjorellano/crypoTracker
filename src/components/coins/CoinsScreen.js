import React from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import  Colors  from "../../res/colors";
import Http from "../../libs/http";
import CoinsItem from "./CoinsItem";
import CoinsSearch from "./CoinsSearch";

class CoinsScreen extends React.Component {

    state = {
        coins: [],
        allCoins: [],
        loading: false
    }
    
    componentDidMount = async () => {
        this.setState({ loading: true });
        const res = await Http.instance.get("https://api.coinlore.net/api/tickers/");
        this.setState({ coins: res.data, allCoins: res.data, loading: false });
    }

    handlePress = (coin) => {
        this.props.navigation.navigate("CoinDetail", { coin });
    }

    handleSearch = (query) => {
        const { allCoins } = this.state;
        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({ coins: coinsFiltered });
    }

  render() {
    
    const { coins, loading } = this.state;

    return (
      <View style={styles.container}>
        <CoinsSearch onChange={this.handleSearch} />
        { loading ? 
            <ActivityIndicator
                style={styles.loader}
                color="white"
                size="large"
            />
        : null
        }
        <FlatList
            data={coins}
            renderItem={({item}) => 
                <CoinsItem 
                    item={item}
                    onPress={() => this.handlePress(item)}
                />
            }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },

    loader: {
        marginTop: 350
    }

});

export default CoinsScreen;