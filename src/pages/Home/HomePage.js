import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Avatar from "../../assets/avatar.png";
import { ColonIcon } from "../../assets/icons";
import { useEffect, useState } from "react";
import HomeDropMenu from "../../components/home/HomeDropMenu";
import ItemComponent from "../../components/home/itemComponent";
import AddClientPopup from "../../components/home/AddClientPopup";
import AddClientButton from "../../components/home/AddClientButton";
import { Initilaize } from "../../utils/pterodactyl";

function HomePage() {
  const { appData, clientData } = useSelector((state) => state.app);
  const [dropmenu, setDropMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    user
      ?.getIdToken(true)
      .then((token) => {
        Initilaize(user.uid, token).then((result) => {
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flex: 3,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            margin: 20,
            padding: 50,
            borderRadius: 25,
            shadowColor: "#3e4685",
            elevation: 10,
          }}
        >
          <TouchableHighlight
            activeOpacity={1.0}
            underlayColor={"#9d9d9d"}
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
            onPress={() => {
              setDropMenu(!dropmenu);
            }}
          >
            <ColonIcon fill={"#3d4785"} style={{ width: 20, height: 10 }} />
          </TouchableHighlight>
          {dropmenu && <HomeDropMenu setDropMenu={setDropMenu} user={user} />}
          <Image
            source={Avatar}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={{
              marginTop: 15,
              color: "#535c93",
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            {user.displayName}
          </Text>

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={{
              marginTop: 5,
            }}
          >
            {user.email}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 40,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                padding: 5,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "#555c93",
                  fontSize: 22,
                }}
              >
                {appData.length}
              </Text>
              <Text style={{ color: "#434343", marginTop: 10 }}>
                Application
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#e2e2e2",
                width: 2,
                marginLeft: 15,
                marginRight: 15,
              }}
            />

            <View
              style={{
                alignItems: "center",
                padding: 5,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "#555c93",
                  fontSize: 22,
                }}
              >
                {clientData.length}
              </Text>
              <Text style={{ color: "#434343", marginTop: 10 }}>Clients</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 3, margin: 20 }}>
          {loading ? (
            <ActivityIndicator size={"large"} color={"#3e4685"} />
          ) : (
            clientData.map((data, index) => (
              <ItemComponent info={data} key={index} />
            ))
          )}
        </View>
      </ScrollView>

      <AddClientPopup />

      <AddClientButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f3f8fe",
  },
});

export default HomePage;
