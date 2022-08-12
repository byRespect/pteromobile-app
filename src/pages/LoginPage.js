import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import {
  CloseEyeIcon,
  EmailIcon,
  EyeIcon,
  PasswordIcon,
} from "../assets/icons";
import { FirebaseLogin } from "../firebase/auth";
import { navigate } from "../navigator/rootNavigator";
import Logo from "../assets/logo.png";

function LoginPage() {
  const [hidepassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fncLogin = () => {
    FirebaseLogin(email, password);
  };
  return (
    <View style={styles.container}>
      <Image style={{ width: 100, height: 100 }} source={Logo} />
      {/**EMAİL BOX START */}
      <View style={styles.itemContainer}>
        <Text style={{ color: "#7e7e7e" }}>Email Address</Text>
        <View style={styles.inputContainer}>
          <EmailIcon fill={"#333333"} style={styles.icon} />
          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            placeholderTextColor={"#333333"}
            onChangeText={setEmail}
          />
        </View>
      </View>
      {/**EMAİL BOX END */}
      {/**PASSWORD BOX START */}
      <View style={styles.itemContainer}>
        <Text style={{ color: "#7e7e7e" }}>Password</Text>
        <View style={styles.inputContainer}>
          <PasswordIcon fill={"#333333"} style={styles.icon} />
          <TouchableHighlight
            onPress={() => {
              setHidePassword(!hidepassword);
            }}
            underlayColor={"#9d9d9d"}
            activeOpacity={100.0}
            style={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
              width: 30,
              height: 30,
              right: 5,
              zIndex: 5,
            }}
          >
            {hidepassword ? (
              <EyeIcon fill={"#333333"} style={{ width: 18, height: 18 }} />
            ) : (
              <CloseEyeIcon
                fill={"#333333"}
                style={{ width: 18, height: 18 }}
              />
            )}
          </TouchableHighlight>
          <TextInput
            secureTextEntry={hidepassword}
            placeholder="Enter your password"
            style={styles.input}
            placeholderTextColor={"#333333"}
            onChangeText={setPassword}
          />
        </View>
      </View>
      {/**PASSWORD BOX END */}
      {/**LOGİN BUTTON START */}
      <TouchableHighlight
        onPress={fncLogin}
        activeOpacity={1.0}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableHighlight>
      {/**LOGİN BUTTON END */}
      <View
        style={{
          marginTop: 15,
          width: "80%",
          flexDirection: "row",
          alignContent: "space-between",
        }}
      >
        <Text
          style={{ flex: 1, color: "#333333" }}
          onPress={() => navigate("Register")}
        >
          Signup
        </Text>
        <Text style={{ color: "#333333" }}>Forgot Password?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f8fe",
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    paddingLeft: 30,
    width: "80%",
    shadowColor: "#3e4685", //"#e3ebf8",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 30,
    marginTop: 20,
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  icon: {
    position: "absolute",
    width: 18,
    height: 18,
  },
  input: {
    flex: 1,
    paddingLeft: 30,
    color: "#333333",
  },
  button: {
    marginTop: 15,
    alignItems: "center",
    width: "80%",
    padding: 15,
    backgroundColor: "#3e4685",
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginPage;
