import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/theme/theme";

const CookBook = () => {
  return (
    <SafeAreaView
      style={{ height: "100%", backgroundColor: COLORS.WHITE }}
    ></SafeAreaView>
  );
};

export default CookBook;

const styles = StyleSheet.create({});
