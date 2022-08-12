import Toast from "react-native-toast-message";
import {
  InsertClient,
  SetAppData,
  SetSocketData,
} from "../redux/slices/appSlice";
import store from "../redux/store";
import { PUBLIC_ENV_API_URL } from "@env";

function customFetch(url, options, timeout = 3000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    ),
  ]);
}

const GetServerList = (url, key) => {
  return customFetch(`${url}/api/client`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${key}`,
    },
  })
    .then((result) => result.json())
    .then((result) => {
      if (result?.data?.length > 0) {
        result.data[0].url = url;
        result.data[0].key = key;
        store.dispatch(InsertClient(result.data));
        return true;
      }
      return false;
    })
    .catch((error) => {
      console.error(`ERROR -> ${error}`);
      return error;
    });
};

const GetPanelList = (uid, tokenid) => {
  return fetch(`${PUBLIC_ENV_API_URL}/mobile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      tokenid,
      uid,
    },
  })
    .then((result) => result.json())
    .then((result) => {
      if (result.success === true) {
        store.dispatch(SetAppData(result.response));
        return result;
      }
      return false;
    })
    .catch((err) => err);
};

const Initilaize = (uid, tokenid) => {
  return GetPanelList(uid, tokenid)
    .then((result) => {
      if (result.success === true) {
        result.response.map((app) => {
          GetServerList(app.url, app.key)
            .then((result) => {
              if (result === true) return true;
              return false;
            })
            .catch((error) => error);
        });
      }
    })
    .catch((error) => error);
};

const AddClient = (uid, tokenid, apikey, url, name) => {
  return fetch(`${PUBLIC_ENV_API_URL}/mobile`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      tokenid,
      uid,
    },
    body: JSON.stringify({
      authorization: apikey,
      url,
      name,
      type: "CLIENT",
    }),
  })
    .then((result) => result.json())
    .then((result) => {
      if (result?.success === true) {
        Toast.show({
          type: "success",
          text1: "Successfully added client",
          text2: "You can manage your client from the home page.",
        });
        return true;
      } else if (result?.success === false) {
        Toast.show({
          type: "info",
          text1: result.response.name,
          text2: result.response.message,
        });
        return false;
      } else {
        Toast.show({
          type: "error",
          text1: "Error adding client",
          text2: "Unknown error",
        });
        return false;
      }
    })
    .catch((error) => {
      Toast.show({
        type: "error",
        text1: "Error adding client",
        text2: error, //"Unknown error",
      });
      return false;
    });
};

const ServerWebSocket = (url, identifier, apikey) => {
  store.dispatch(
    SetSocketData({
      status: false,
      loading: true,
      response: {},
    })
  );
  fetch(`${url}/api/client/servers/${identifier}/websocket`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apikey}`,
    },
  })
    .then((result) => {
      result.json();
      store.dispatch(
        SetSocketData({
          status: true,
          loading: false,
          response: result.json(),
        })
      );
    })
    .catch((error) => {
      store.dispatch(
        SetSocketData({
          status: false,
          loading: false,
          response: error,
        })
      );
    });
};
export { Initilaize, AddClient, ServerWebSocket };
