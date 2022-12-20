import React from "react";
import { View, StyleSheet, TextInput, Platform } from "react-native";
import Colors from "../../res/colors";

class CoinsSearch extends React.Component {

    state = {
        query: ""
    }

    handleText = (query) => {
        this.setState({ query });
        if (this.props.onChange) {
            this.props.onChange(query);
        }
    };
  
    render() {
        
        const { query } = this.state;

    return(
        <View>
            <TextInput
                style={[
                    styles.textInput,
                    Platform.OS == "ios" ?
                        styles.textInputIOS :
                        styles.textInputAndroid
                ]}
                onChangeText={this.handleText}
                value={query}
                placeholder="Search coin"
                placeholderTextColor="#fff"
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: "rgba(0,0,0,0.2)",
        paddingLeft: 16,
        color: "#fff",
        marginBottom: 2,
        // marginTop: 2,
    },
    textInputAndroid: {
        borderBottomWidth: 0.5,
        borderTopColor: Colors.gray,
        borderBottomColor: Colors.gray,
    },
    textInputIOS: {
        margin: 8,
        borderRadius: 8,
    },
});

export default CoinsSearch;