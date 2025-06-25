import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalApi from "@/services/GlobalApi";
import axios, { isAxiosError } from "axios";
const RecipeByCategory = () => {
  const { categoryName } = useLocalSearchParams();

  useEffect(() => {
    GetRecipeListByCategory();
  }, []);
  const GetRecipeListByCategory = async () => {
    console.log("123");

    try {
      if (!categoryName || typeof categoryName !== "string") {
        throw new Error("Invalid category parameter");
      }
      const result = await GlobalApi.GetRecipeByCategory(categoryName);
      if (!result.data?.data) {
        throw new Error("Invalid response format");
      }
      console.log(result.data);
    } catch (error) {
      console.error("GetRecipesByCategory error:", {
        categoryName,
        error: isAxiosError(error)
          ? {
              status: error.response?.status,
              data: error.response?.data,
              config: error.config,
            }
          : error,
      });

      throw error; // Hoặc return giá trị mặc định
    }
  };
  return (
    <SafeAreaView
      style={{
        padding: 20,
        paddingTop: 55,
        backgroundColor: COLORS.WHITE,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontFamily: FONTFAMILY.outfit_bold,
          fontSize: 25,
        }}
      >
        Browse {categoryName} Recipes
      </Text>
    </SafeAreaView>
  );
};

export default RecipeByCategory;

const styles = StyleSheet.create({});
