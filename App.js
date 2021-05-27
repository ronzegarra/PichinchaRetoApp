import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

const Detail = (item) => {
  return (
    <View>
      <Text>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
    </View>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };
  }

  async componentDidMount() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const json = await response.json();

    this.setState({ results: json.results });
  }

  goDetail(item) {
    console.warn("Detalle", item);
    return <Detail />;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewForm}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginBottom: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                marginBottom: 5,
              }}
            >
              <View style={{ flexDirection: "column", alignSelf: "stretch" }}>
                <Text style={styles.titleInput}>Buscar</Text>
                <View style={[styles.viewInput, { height: 35 }]}>
                  <TextInput
                    underlineColorAndroid={"transparent"}
                    value={this.state.name}
                    style={{ height: 40, borderRadius: 6 }}
                    //onChangeText={(name) => this.changeName(name)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <FlatList
          data={this.state.results}
          renderItem={({ index, item }) => (
            <TouchableOpacity
              style={{ height: 250 }}
              onPress={() => this.goDetail(item)}
            >
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                    index + 1
                  }.png`,
                }}
              />
              <Text>#{index + 1}</Text>
              <Text>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: "#70136E",
    borderWidth: 2,
  },
  title: {
    fontSize: 12,
    padding: 5,
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
});
