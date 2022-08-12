import { useEffect, useState } from "react";
import { NextIcon, ServerIcon } from "../../assets/icons";
import { navigateHome } from "../../navigator/rootNavigator";

const { View, Text, StyleSheet, TouchableHighlight } = require("react-native");

function ItemComponent({ info }) {
  const [websocket, setWebSocket] = useState({});
  useEffect(() => {
    fetch(
      `${info.url}/api/client/servers/${info.attributes.identifier}/websocket`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${info.key}`,
        },
      }
    )
      .then((result) => result.json())
      .then((result) => {
        setWebSocket(result.data);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.itemIconContainer}>
        <ServerIcon fill={"#3e4685"} style={{ width: 40, height: 40 }} />
      </View>
      <View style={styles.itemContentContainer}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={styles.textServerTitle}
        >
          {info.attributes.name}
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={styles.textServerDescription}
        >
          {
            info.attributes.relationships.allocations.data[0].attributes
              .ip_alias
          }
          :{info.attributes.relationships.allocations.data[0].attributes.port}
        </Text>
      </View>
      <TouchableHighlight
        onPress={() => {
          navigateHome("Dashboard", { info, websocket });
        }}
        activeOpacity={1.0}
        underlayColor={"#9d9d9d"}
        style={styles.nextButton}
      >
        <NextIcon fill={"#3e4685"} style={{ width: 20, height: 20 }} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 25,
    shadowColor: "#3e4685",
    elevation: 10,
    backgroundColor: "white",
    flexDirection: "row",
    marginBottom: 10,
  },
  itemIconContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContentContainer: {
    flex: 5,
  },
  nextButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  textServerTitle: {
    fontWeight: "bold",
    color: "#3e4685",
  },
  textServerDescription: {
    color: "#091353",
    fontSize: 10,
    fontWeight: "300",
  },
});

export default ItemComponent;
