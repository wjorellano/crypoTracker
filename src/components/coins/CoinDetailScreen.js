import React from "react";
import { View, Text, Image, StyleSheet, SectionList, FlatList, Pressable, Alert } from "react-native";
import Colors from "../../res/colors";
import Http from "../../libs/http";
import Storage from "../../libs/storage";
import CoinMarketItem from "./CoinMarketItem";

class CoinDetailScreen extends React.Component {

  state = {
    coin: {},
    markets: [],
    isFavorite: false
  }

  toogleFavorite = () => {

    if(this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  }

  addFavorite = async() => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;

    const stored = await Storage.instance.store(key, coin);

    console.log("stored", stored);

    if(stored) {
      this.setState({ isFavorite: true });
    }

  }

  removeFavorite = async () => {

    Alert.alert("Remove favorite", "Are you sure?", [
      {
        text: "cancel",
        onPress: () => {},
        style: "cancel"
      },
      {
        text: "Remove",
        onPress: async () => {

          const key = `favorite-${this.state.coin.id}`;

          await Storage.instance.remove(key);

          this.setState({ isFavorite: false });
        },
        style: "destructive"
      }
    ]);

  }

  getFavorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`;

      const favStr = await Storage.instance.get(key);

      if(favStr != null) {
        this.setState({ isFavorite: true });
      }

    } catch(err) {
      console.log("get favorites err", err);
    }

  }

  getSymbolsIcon = (name) => {
    if (name) {
      const symbol = name.toLowerCase().replace(" ", "-");
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  getSections = (coin) => {
    const section = [
      {
        title: "Market Cap",
        data: [this.state.coin.market_cap_usd],
      },
      {
        title: "Volume 24h",
        data: [this.state.coin.volume24],
      },
      {
        title: "Change 24h",
        data: [this.state.coin.percent_change_24h],
      },
    ];
    return section;
  };

  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    this.setState({ markets });
  };

  componentDidMount() {
    const { coin } = this.props.route.params;
    this.props.navigation.setOptions({ title: coin.symbol });
    this.getMarkets(coin.id);
    this.setState({ coin } , () => {
      this.getFavorite();
    });
  }



  render() {

    const { coin, markets, isFavorite } = this.state;
    
    return (
      <View style={styles.container}>
        <View style={styles.subHeader} >
          <View style={styles.row}>
            <Image style={styles.iconImg} source={{ uri: this.getSymbolsIcon(coin.name) }} />
            <Text style={styles.titleText} >{coin.name}</Text>
          </View>
          <Pressable
            onPress={() => this.toogleFavorite()} 
            style={[
              styles.btnFavorite,
              isFavorite ? 
                styles.btnFavoriteRemove : 
                styles.btnFavoriteAdd
            ]}
          >
            <Text style={styles.btnText}>{isFavorite ? "Remove Favorite" : "Add favorite"}</Text>
          </Pressable>
        </View>
        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />
        <Text style={styles.marketsTitle}>Markets</Text>
        <FlatList
          horizontal={true}
          style={styles.list}
          data={markets}
          renderItem={({ item }) => (
            <CoinMarketItem
              item={item}
             />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  row: {
    flexDirection: "row",
  },
  subHeader: {
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  titleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  sectionHeader: {
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: "#fff",
    fontSize: 14,
  },
  section: {
    maxHeight: 220,
  },
  sectionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  marketsTitle: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 16,
    fontWeight: "bold",
    marginTop: 13,
    marginBottom: 10,
  },
  marketItem: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 16,
  },
  list: {
    maxHeight: 120,
    paddingLeft: 16,
    padding: 8
  },
  btnFavorite: {
    padding: 10,
    borderRadius: 8,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
  btnText: {
    color: "#fff",
  },
});

export default CoinDetailScreen;