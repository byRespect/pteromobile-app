import { StyleSheet, Text, View } from "react-native";
import ActionMenu from "./ActionMenu";
import BackButton from "./BackButton";
import ChangeActionComp from "./ChangeActionComp";
import { navigateHome } from "../../navigator/rootNavigator";

function DashboardHeader({ params }) {
  const { info, actionmenuopen, setActionMenuOpen } = params;
  return (
    <View style={styles.headContainer}>
      <View style={[styles.headContentContainer, { flex: 2 }]}>
        <BackButton navigate={navigateHome} />
      </View>
      <View style={[styles.headContentContainer, { flex: 6 }]}>
        <Text numberOfLines={1} adjustsFontSizeToFit={true}>
          {info.attributes.name}
        </Text>
      </View>
      <View style={[styles.headContentContainer, { flex: 2 }]}>
        <ChangeActionComp
          actionmenuopen={actionmenuopen}
          setActionMenuOpen={setActionMenuOpen}
        />
      </View>
      {actionmenuopen && <ActionMenu info={info} />}
    </View>
  );
}

const styles = StyleSheet.create({
  headContainer: {
    width: "90%",
    flexDirection: "row",
    marginTop: 5,
    padding: 10,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    shadowColor: "#3e4685",
    elevation: 20,
  },
  headContentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DashboardHeader;
