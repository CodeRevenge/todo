import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { ID_TOKEN_KEY } from "./config";

import { Main, Auth } from "./src";

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = (isNewUser = false) => {
    SecureStore.getItemAsync(ID_TOKEN_KEY).then((session) => {
      if (session) {
        const sessionObj = JSON.parse(session);
        const { exp, token, id, name } = sessionObj;
        if (exp > Math.floor(new Date().getTime() / 1000)) {
          setToken(token);
          setUser({ id, name, isNewUser });
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      {token && user && <Main token={token} user={user} />}
      <Auth
        token={token}
        onLogin={handleLogin}
        onLogout={() => setToken(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
