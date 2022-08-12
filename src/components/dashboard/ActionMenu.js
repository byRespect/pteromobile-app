import { StyleSheet, Text, View } from "react-native";

function ActionMenu({ info }) {
  return (
    <View style={styles.container}>
      <Text>Start</Text>
      <Text>Stop</Text>
      <Text>Restart</Text>
      <Text>Kill</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    padding: 3,
    width: 80,
    right: 57,
    bottom: -65,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#3e4685",
    elevation: 20,
    zIndex: 9000,
  },
});

export default ActionMenu;
