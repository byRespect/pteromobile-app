import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { InsertUserData } from "../../redux/slices/appSlice";
import { AddClient } from "../../utils/pterodactyl";

function AddClientPopup() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { AddClientPopup } = useSelector((state) => state.app);
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [apikey, setApiKey] = useState("");
  const clearData = (status) => {
    setName("");
    setUrl("");
    setApiKey("");
    setLoading(status);
  };
  const fncAddClient = () => {
    if (!loading) {
      setLoading(true);
      user
        .getIdToken(true)
        .then((token) => {
          AddClient(user.uid, token, apikey, url, name).then((result) => {
            if (result) {
              dispatch(
                InsertUserData({
                  name,
                  url,
                  apikey,
                })
              );
              clearData(false);
            }
          });
        })
        .catch((error) => {
          console.error(error);
          clearData(false);
        });
    }
  };
  return AddClientPopup ? (
    <View style={styles.container}>
      <View style={styles.backgroundContainer} />
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Text style={{ color: "#7e7e7e" }}>Panel Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="My Server"
              style={styles.input}
              placeholderTextColor={"#333333"}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={styles.item}>
          <Text style={{ color: "#7e7e7e" }}>Panel URL</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="http://123.123.123.123"
              style={styles.input}
              placeholderTextColor={"#333333"}
              onChangeText={setUrl}
            />
          </View>
        </View>

        <View style={styles.item}>
          <Text style={{ color: "#7e7e7e" }}>Panel Api Key</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your client api key"
              style={styles.input}
              placeholderTextColor={"#333333"}
              onChangeText={setApiKey}
            />
          </View>
        </View>

        <View style={styles.item}>
          <TouchableHighlight
            style={[
              styles.button,
              { backgroundColor: loading ? "#333333" : "#3e4685" },
            ]}
            onPress={fncAddClient}
          >
            <Text style={styles.buttonText}>Add Application</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
  },
  button: {
    alignItems: "center",
    padding: 5,
  },
  backgroundContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.7,
  },
  container: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  itemContainer: {
    opacity: 4,
    backgroundColor: "white",
    width: "90%",
    padding: 15,
    borderRadius: 20,
  },
  item: {
    marginBottom: 10,
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    color: "#333333",
  },
});

export default AddClientPopup;
