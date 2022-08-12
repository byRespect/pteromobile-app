import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DashboardConsole from "../../components/dashboard/DashboardConsole";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

function DashHomePage({ route }) {
  const { info, websocket } = route.params;
  const [actionmenuopen, setActionMenuOpen] = useState(false);
  return (
    <View style={styles.container}>
      <DashboardHeader params={{ info, actionmenuopen, setActionMenuOpen }} />
      <DashboardConsole info={info} websocket={websocket} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f3f8fe",
    alignItems: "center",
  },
});

export default DashHomePage;
