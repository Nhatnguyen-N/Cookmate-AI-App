import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FONTFAMILY } from "@/theme/theme";
import GlobalApi from "@/services/GlobalApi";
import RecipeCard from "./RecipeCard";
import RecipeCardHome from "./RecipeCardHome";

const LatestRecipes = () => {
  const [recipeList, setRecipeList] = useState();
  useEffect(() => {
    GetAllRecipes();
  }, []);

  const GetAllRecipes = async () => {
    try {
      const result = await GlobalApi.GetALlRecipesByLimit(10);
      // console.log(result.data.data);
      setRecipeList(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: FONTFAMILY.outfit_bold,
        }}
      >
        LatestRecipes
      </Text>
      <FlatList
        data={recipeList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <RecipeCardHome recipe={item} />
          </View>
        )}
      />
    </View>
  );
};

export default LatestRecipes;

const styles = StyleSheet.create({});
