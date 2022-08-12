import { StyleSheet, TouchableHighlight } from "react-native";
import { BackIcon } from "../../assets/icons";

function BackButton({ navigate }) {
  return (
    <TouchableHighlight
      onPress={() => {
        navigate("Home");
      }}
      style={styles.container}
    >
      <BackIcon style={{ width: 25, height: 25 }} fill={"#fff"} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3e4685",
    borderRadius: 50,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 5,
  },
});

export default BackButton;
