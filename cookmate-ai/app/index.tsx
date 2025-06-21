import { Redirect } from "expo-router";
import { View } from "react-native";
import { useLogto } from "@logto/rn";
import { useEffect } from "react";
export default function Index() {
  const { getIdTokenClaims, isAuthenticated } = useLogto();
  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then((userData) => {
        console.log("--", userData);
      });
    }
  }, [isAuthenticated]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Redirect href={"/Landing"} /> */}
    </View>
  );
}
