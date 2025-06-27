import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import GlobalApi from "@/services/GlobalApi";
import RecipeCard from "@/components/RecipeCard";

const Explore = () => {
  const [recipeList, setRecipeList] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetAllRecipes();
  }, []);
  const GetAllRecipes = async () => {
    try {
      setLoading(true);
      const result = await GlobalApi.GetAllRecipeList();
      // console.log(result.data.data);
      setRecipeList(result.data.data);
    } catch (error) {
      console.log("Error ALl Recipe:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{
        height: "100%",
        backgroundColor: COLORS.WHITE,
        padding: 20,
        paddingBottom: 0,
      }}
    >
      <Text
        style={{
          fontFamily: FONTFAMILY.outfit_bold,
          fontSize: 30,
        }}
      >
        Explore
      </Text>
      <FlatList
        data={recipeList}
        numColumns={2}
        refreshing={loading}
        onRefresh={GetAllRecipes}
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

export default Explore;

const styles = StyleSheet.create({});
