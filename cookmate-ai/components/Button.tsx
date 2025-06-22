import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
const Button = ({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress?: () => void;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.PRIMARY,
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        width: "100%",
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={20} color={"white"} />
      <Text
        style={{
          textAlign: "center",
          color: COLORS.WHITE,
          fontSize: 17,
          fontFamily: FONTFAMILY.outfit,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
const styles = StyleSheet.create({});
