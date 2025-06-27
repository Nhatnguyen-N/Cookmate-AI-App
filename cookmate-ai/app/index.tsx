import { Redirect, useRouter } from "expo-router";
import { View } from "react-native";
import { useLogto } from "@logto/rn";
import { useContext, useEffect, useState } from "react";
import GlobalApi from "@/services/GlobalApi";
import { UserContext } from "@/context/UserContext";
export default function Index() {
  const { getIdTokenClaims, isAuthenticated } = useLogto();
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading
  console.log("123");
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
    console.log(isAuthenticated);

    const fetchOrCreateUser = async () => {
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

          const { data: createdUser } = await GlobalApi.CreateNewUser(newUser);
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
    };
    if (isAuthenticated) {
      fetchOrCreateUser();
    } else {
      setIsLoading(false);
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
