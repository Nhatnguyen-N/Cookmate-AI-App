import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/theme/theme";
import IntroHeader from "@/components/IntroHeader";
import CreateRecipe from "@/components/CreateRecipe";
import CategoryList from "@/components/CategoryList";

const Home = () => {
  return (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: 20,
      }}
    >
      <SafeAreaView edges={["top"]}>
        {/* Intro */}
        <IntroHeader />
        {/* Recipe Generator UI */}
        <CreateRecipe />
        {/* Category */}
        <CategoryList />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
