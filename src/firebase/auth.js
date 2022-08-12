import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth/react-native";
import store from "../redux/store";
import { setAuth } from "../redux/slices/authSlice";
import { navigate } from "../navigator/rootNavigator";
import {
  PUBLIC_ENV_apiKey,
  PUBLIC_ENV_authDomain,
  PUBLIC_ENV_projectId,
  PUBLIC_ENV_storageBucket,
  PUBLIC_ENV_messagingSenderId,
  PUBLIC_ENV_appId,
  PUBLIC_ENV_measurementId,
} from "@env";

const firebaseConfig = {
  apiKey: PUBLIC_ENV_apiKey,
  authDomain: PUBLIC_ENV_authDomain,
  projectId: PUBLIC_ENV_projectId,
  storageBucket: PUBLIC_ENV_storageBucket,
  messagingSenderId: PUBLIC_ENV_messagingSenderId,
  appId: PUBLIC_ENV_appId,
  measurementId: PUBLIC_ENV_measurementId,
};

var firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig, { name: "APP_PTEROMOBILE" });
  initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}
firebaseApp = getApp("APP_PTEROMOBILE");
var firebaseAuth = getAuth(firebaseApp);

const FirebaseRegister = (displayname, email, password) => {
  createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then((user) => {
      updateProfile(firebaseAuth.currentUser, {
        displayName: displayname,
      })
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Register Successfully",
            text2: `Welcome ${user.user.email}`,
          });
          navigate("Home");
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: "Auth Register Error",
            text2: error.code,
          });
        });
    })
    .catch((error) => {
      Toast.show({
        type: "error",
        text1: "Auth Error",
        text2: error.code,
      });
    });
};

const FirebaseLogin = (email, password) => {
  signInWithEmailAndPassword(firebaseAuth, email.replace(/\s/g, ""), password)
    .then((user) => {
      Toast.show({
        type: "success",
        text1: "Login Successfully",
        text2: `Welcome ${user.user.email}`,
      });
      navigate("Home");
    })
    .catch((error) => {
      Toast.show({
        type: "error",
        text1: "Auth Error",
        text2: error.code,
      });
    });
};

const FirebaseLogout = (user) => {
  signOut(firebaseAuth)
    .then(() => {
      Toast.show({
        type: "info",
        text1: "Logout Successfully",
        text2: `Goodbye ${user.displayName}`,
      });
    })
    .catch((error) => {
      Toast.show({
        type: "error",
        text1: "Auth Error",
        text2: error.code,
      });
    });
  navigate("Login");
};

onAuthStateChanged(firebaseAuth, (user) => {
  if (user) {
    store.dispatch(
      setAuth({
        user,
        loading: false,
        error: "",
      })
    );
  } else {
    store.dispatch(
      setAuth({
        user: {},
        loading: false,
        error: "",
      })
    );
  }
});

export { firebaseApp, FirebaseRegister, FirebaseLogin, FirebaseLogout };
