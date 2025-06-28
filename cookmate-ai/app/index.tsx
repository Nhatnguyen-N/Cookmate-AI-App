import { Redirect, useRouter } from "expo-router";
import { AppState, Linking, View } from "react-native";
import { useLogto } from "@logto/rn";
import { useContext, useEffect, useState } from "react";
import GlobalApi from "@/services/GlobalApi";
import { UserContext } from "@/context/UserContext";
import * as SecureStore from "expo-secure-store";
export default function Index() {
  const { getIdTokenClaims, isAuthenticated } = useLogto();
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading
  const [idTokenState, setIdTokenState] = useState<string | null>();
  console.log("isAuth", isAuthenticated);

  // useEffect(() => {
  //   setIsLoading(true);
  //   try {
  //     if (isAuthenticated) {
  //       getIdTokenClaims().then(async (userData) => {
  //         console.log("--", userData);
  //         if (userData?.email) {
  //           // const result = await GlobalApi.GetUserByEmail(userData?.email);
  //           const { data: apiResponse } = await GlobalApi.GetUserByEmail(
  //             userData.email
  //           );
  //           console.log("extis1:", apiResponse?.data?.data[0]);
  //           // Xử lý cả 2 định dạng Strapi response
  //           const existingUser =
  //             apiResponse.data?.[0]?.attributes || apiResponse.data?.[0];
  //           console.log("exits:", existingUser);

  //           if (!existingUser) {
  //             const newUser = {
  //               email: userData.email,
  //               name: userData.name, // Fallback name
  //               picture: userData.picture,
  //             };

  //             const { data: createdUser } = await GlobalApi.CreateNewUser(
  //               newUser
  //             );
  //             setUser(createdUser.data);
  //             router.replace("/(tabs)/home");
  //           } else {
  //             setUser(existingUser);
  //             router.replace("/(tabs)/home");
  //           }
  //         }
  //       });
  //     } else {
  //       console.log("isAU", isAuthenticated);
  //       // router.replace("/Landing");
  //     }
  //   } catch (error) {
  //     console.log("Error", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);
  useEffect(() => {
    const fetchOrCreateUser = async () => {
      const idToken = await SecureStore.getItemAsync("authToken");
      console.log("token2", idToken);
      setIdTokenState(idToken);
      if (idToken !== "") {
        try {
          const userData = await getIdTokenClaims();

          if (!userData?.email) {
            console.warn("No email in user claims");
            // router.replace("/Landing");
            setIsLoading(false);
            return;
          }

          // Log full response để debug
          const { data: apiResponse } = await GlobalApi.GetUserByEmail(
            userData.email
          );
          console.log("api", apiResponse);

          // Xử lý cả 2 định dạng Strapi response
          const existingUser =
            apiResponse.data?.[0]?.attributes || apiResponse.data?.[0];

          if (!existingUser) {
            const newUser = {
              email: userData.email,
              name: userData.name, // Fallback name
              picture: userData.picture,
            };

            const { data: createdUser } = await GlobalApi.CreateNewUser(
              newUser
            );
            setUser(createdUser.data);
            router.replace("/(tabs)/home");
          } else {
            setUser(existingUser);
            router.replace("/(tabs)/home");
          }
          router.replace("/(tabs)/home");
        } catch (error) {
          console.error("User fetch error:", error);
          // Xử lý UI khi lỗi (ví dụ: hiển thị toast)
        } finally {
          setIsLoading(false);
        }
      } else {
        return null;
      }
    };

    const handleDeepLink = (event: { url: string }) => {
      if (event.url.includes("cookmateai://callback")) {
        fetchOrCreateUser();
      }
    };

    // Lắng nghe sự kiện deep link
    const linkingSubscription = Linking.addEventListener("url", handleDeepLink);

    // Xử lý khi app trở lại foreground
    const appStateSubscription = AppState.addEventListener(
      "change",
      (state) => {
        if (state === "active") {
          fetchOrCreateUser();
        }
      }
    );

    // Kiểm tra ngay khi component mount
    fetchOrCreateUser();

    return () => {
      linkingSubscription.remove();
      appStateSubscription.remove();
    };
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!idTokenState ? (
        <Redirect href={"/Landing"} />
      ) : (
        <Redirect href={"/(tabs)/home"} />
      )}
    </View>
  );
}
