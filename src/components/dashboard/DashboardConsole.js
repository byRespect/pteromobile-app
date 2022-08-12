import { Component, useEffect } from "react";
import { Text, View } from "react-native";
import { io } from "socket.io-client";

function DashboardConsole({ info, websocket }) {
  useEffect(() => {
    const socket = io(websocket.socket, {
      auth: {
        token: websocket.token,
      },
      withCredentials: true,
      reconnection: false,
      transports: ["websocket"],
      extraHeaders: {
        Authorization: `Bearer ${info.key}`,
      },
    });

    socket.on("connect", () => {
      console.log("connect");
    });

    socket.on("connection", () => {
      console.log("connection");
      socket.emit(
        "auth",
        JSON.stringify({ event: "auth", args: [websocket.token] })
      );
    });

    socket.on("error", (error) => {
      console.error("error -> ", error);
    });

    socket.on("connect_error", (error) => {
      console.error("connect_error -> ", error);
    });
  }, []);
  return (
    <View>
      <Text>Dash</Text>
    </View>
  );
}

export default DashboardConsole;
