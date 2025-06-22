import { Image, Platform, StyleSheet, Switch, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { FONTFAMILY } from "@/theme/theme";

const IntroHeader = () => {
  const { user } = useContext(UserContext);
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Image
          source={{ uri: user?.picture }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
          }}
        />
        <Text
          style={{
            fontFamily: FONTFAMILY.outfit_bold,
            fontSize: Platform.OS === "ios" ? 18 : 20,
          }}
        >
          Hello, {user?.name}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Text style={{ fontFamily: FONTFAMILY.outfit, fontSize: 16 }}>
          {isEnabled ? "Veg" : "Non-Veg"}
        </Text>
        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
        />
      </View>
    </View>
  );
};

export default IntroHeader;

const styles = StyleSheet.create({});
