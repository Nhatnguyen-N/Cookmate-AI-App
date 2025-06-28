import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import RecipeIntro from "@/components/RecipeIntro";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import Ingredient from "@/components/Ingredient";
import RecipeSteps from "@/components/RecipeSteps";
import CreateRecipe from "@/components/CreateRecipe";
import GlobalApi from "@/services/GlobalApi";
import { UserContext } from "@/context/UserContext";
import LoadingDialog from "@/components/LoadingDialog";

const RecipeDetail = () => {
  const { recipeData }: any = useLocalSearchParams();
  const { user } = useContext(UserContext);
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const recipe = JSON.parse(recipeData as string);
  // console.log("recipe", recipe.documentId);

  useEffect(() => {
    user && savedUserRecipeList();
  }, []);
  const savedUserRecipeList = async () => {
    try {
      setLoading(true);
      //Fetch Save Document Id
      const result = await GlobalApi.SavedRecipeList(user?.email);
      // console.log("fav:",result.data.data);
      const savedData = result.data.data;
      let QueryFilter = "";
      savedData.forEach((element: any) => {
        QueryFilter =
          QueryFilter +
          "filters[documentId][$in]=" +
          element?.recipeDocId +
          "&";
      });
      // console.log(QueryFilter);
      // Pass Document Id To Fetch Recipes
      const resp = await GlobalApi.GetSavedRecipes(QueryFilter);
      // console.log("List", resp.data.data[0].documentId);
      setRecipeList(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  function isRecipeExist(): boolean {
    // Kiểm tra nếu recipe hoặc recipeList không tồn tại
    if (!recipe || !recipeList || !recipe.documentId) {
      return false;
    }
    // Sử dụng Array.prototype.some() để kiểm tra sự tồn tại
    return recipeList.some(
      (item: any) => item?.documentId === recipe?.documentId
    );
  }
  const isFavorite = isRecipeExist();
  return loading ? (
    <LoadingDialog visible={loading} />
  ) : (
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
          <RecipeIntro isFav={isFavorite} recipe={recipe} />
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
