import { Text, TouchableHighlight, View } from "react-native";
import { LogoutIcon, UserIcon } from "../../assets/icons";
import { FirebaseLogout } from "../../firebase/auth";

function HomeDropMenu({ setDropMenu, user }) {
  const fncLogOut = () => {
    console.log(user);
    FirebaseLogout(user);
    setDropMenu(false);
  };
  return (
    <View
      style={{
        width: 120,
        position: "absolute",
        right: 30,
        top: 50,
        borderRadius: 10,
        padding: 10,
        zIndex: 1,
        backgroundColor: "white",
        shadowColor: "black",
        elevation: 20,
      }}
    >
      <TouchableHighlight
        underlayColor={"#9d9d9d"}
        style={{
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
          padding: 5,
          marginBottom: 5,
          borderRadius: 15,
        }}
        onPress={() => {}}
      >
        <>
          <UserIcon fill={"black"} style={{ width: 20, marginRight: 5 }} />
          <Text>Profile</Text>
        </>
      </TouchableHighlight>
      <View
        style={{
          flex: 1,
          backgroundColor: "#eeeeee",
          height: 1,
          marginBottom: 5,
        }}
      />
      <TouchableHighlight
        underlayColor={"#9d9d9d"}
        style={{
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
          padding: 5,
          marginBottom: 5,
          borderRadius: 15,
        }}
        onPress={fncLogOut}
      >
        <>
          <LogoutIcon fill={"black"} style={{ width: 20, marginRight: 5 }} />
          <Text>Logout</Text>
        </>
      </TouchableHighlight>
    </View>
  );
}

export default HomeDropMenu;
