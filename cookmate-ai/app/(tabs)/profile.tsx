import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "expo-router";
import { useLogto } from "@logto/rn";

const Profile = () => {
  const options = [
    {
      name: "Create New Recipe",
      icon: require("../../assets/images/i1.png"),
      path: "/(tabs)/home",
    },
    {
      name: "New Recipes",
      icon: require("../../assets/images/i3.png"),
      path: "/(tabs)/cookbook",
    },
    {
      name: "Browse More Recipes",
      icon: require("../../assets/images/i2.png"),
      path: "/(tabs)/explore",
    },
    {
      name: "Logout",
      icon: require("../../assets/images/icon.png"),
      path: "logout",
    },
  ];
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { signOut } = useLogto();
  const onOptionClick = async (option: any) => {
    if (option?.path === "logout") {
      await signOut();
      router.replace("/");
      return;
    }
    router.push(option.path);
  };
  return (
    <SafeAreaView
      style={{ height: "100%", backgroundColor: COLORS.WHITE, padding: 20 }}
    >
      <Text
        style={{
          fontFamily: FONTFAMILY.outfit_bold,
          fontSize: 30,
        }}
      >
        Profile
      </Text>
      <View
        style={{
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Image
          source={{ uri: user?.picture }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 99,
          }}
        />
        <Text
          style={{
            fontFamily: FONTFAMILY.outfit_bold,
            fontSize: 25,
            marginTop: 20,
          }}
        >
          {user?.name}
        </Text>
        <Text
          style={{
            fontFamily: FONTFAMILY.outfit,
            fontSize: 17,
            color: COLORS.GRAY,
          }}
        >
          {user?.email}
        </Text>
      </View>
      <FlatList
        data={options}
        style={{ marginTop: 25 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onOptionClick(item)}
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              padding: 20,
              paddingHorizontal: 15,
            }}
          >
            <Image source={item.icon} style={{ width: 40, height: 40 }} />
            <Text style={{ fontFamily: FONTFAMILY.outfit, fontSize: 20 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
