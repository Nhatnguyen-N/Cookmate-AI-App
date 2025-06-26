import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalApi from "@/services/GlobalApi";
import { isAxiosError } from "axios";
import RecipeCard from "@/components/RecipeCard";
const RecipeByCategory = () => {
  const { categoryName } = useLocalSearchParams();
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(recipeList);

  useEffect(() => {
    GetRecipeListByCategory();
  }, []);
  const GetRecipeListByCategory = async () => {
    setLoading(true);
    try {
      if (!categoryName || typeof categoryName !== "string") {
        throw new Error("Invalid category parameter");
      }
      const result = await GlobalApi.GetRecipeByCategory(categoryName);
      if (!result.data?.data) {
        throw new Error("Invalid response format");
      }
      setRecipeList(result?.data?.data);
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
    } finally {
      setLoading(false);
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
      <FlatList
        data={recipeList}
        numColumns={2}
        refreshing={loading}
        onRefresh={GetRecipeListByCategory}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index} style={{ flex: 1 }}>
            <RecipeCard recipe={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default RecipeByCategory;

const styles = StyleSheet.create({});
