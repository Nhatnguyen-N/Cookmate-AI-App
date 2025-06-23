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
    const fetchOrCreateUser = async () => {
      try {
        const userData = await getIdTokenClaims();

        if (!userData?.email) {
          console.warn("No email in user claims");
          // router.replace("/Landing");
          return;
        }

        // Log full response để debug
        const { data: apiResponse } = await GlobalApi.GetUserByEmail(
          userData.email
        );
        // console.log("Full API response:", apiResponse);

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
        } else {
          setUser(existingUser);
        }
        router.replace("/(tabs)/home");
      } catch (error) {
        console.error("User fetch error:", error);
        // Xử lý UI khi lỗi (ví dụ: hiển thị toast)
      }
    };

    if (isAuthenticated) {
      fetchOrCreateUser();
    }
  }, [isAuthenticated, getIdTokenClaims, router, setUser]); // Thêm các dependencies cần thiết
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
