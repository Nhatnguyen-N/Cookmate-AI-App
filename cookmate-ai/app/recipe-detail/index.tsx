import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import RecipeIntro from "@/components/RecipeIntro";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import Ingredient from "@/components/Ingredient";
import RecipeSteps from "@/components/RecipeSteps";
import CreateRecipe from "@/components/CreateRecipe";

const RecipeDetail = () => {
  const { recipeData }: any = useLocalSearchParams();

  const recipe = JSON.parse(recipeData as string);
  // console.log(recipe);

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View
          style={{
            padding: 20,
            backgroundColor: COLORS.WHITE,
            height: "100%",
          }}
        >
          <RecipeIntro recipe={recipe} />
          <Ingredient ingredients={recipe?.ingredients} />
          <RecipeSteps steps={recipe?.steps} />
          <Text
            style={{
              marginTop: 15,
              fontFamily: FONTFAMILY.outfit,
              fontSize: 16,
              textAlign: "center",
              color: COLORS.GRAY,
            }}
          >
            You are looking something else. Create A New One
          </Text>
          <CreateRecipe />
        </View>
      }
    />
  );
};

export default RecipeDetail;

const styles = StyleSheet.create({});
