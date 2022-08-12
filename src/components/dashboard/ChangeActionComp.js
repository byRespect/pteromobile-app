import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { PowerIcon } from "../../assets/icons";

function ChangeActionComp({ actionmenuopen, setActionMenuOpen }) {
  const fncTouchButton = () => {
    setActionMenuOpen(!actionmenuopen);
  };
  return (
    <TouchableHighlight
      underlayColor={"#9d9d9d"}
      activeOpacity={1.0}
      onPress={fncTouchButton}
      style={styles.container}
    >
      <PowerIcon fill={"#3e4685"} style={{ width: 20, height: 20 }} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#3e4685",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
});

export default ChangeActionComp;
