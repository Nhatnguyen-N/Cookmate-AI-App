import { Redirect, useRouter } from "expo-router";
import { View } from "react-native";
import { useLogto } from "@logto/rn";
import { useContext, useEffect } from "react";
import GlobalApi from "@/services/GlobalApi";
import { UserContext } from "@/context/UserContext";
export default function Index() {
  const { getIdTokenClaims, isAuthenticated } = useLogto();
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then(async (userData) => {
        if (userData?.email) {
          const result = await GlobalApi.GetUserByEmail(userData?.email);
          if (!result.data.data) {
            const data = {
              email: userData.email,
              name: userData.name,
              picture: userData.picture,
            };
            const resp = await GlobalApi.CreateNewUser(data);
            setUser(resp.data.data);
            router.replace("/(tabs)/home");
          } else {
            setUser(result?.data?.data[0]);
            router.replace("/(tabs)/home");
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
