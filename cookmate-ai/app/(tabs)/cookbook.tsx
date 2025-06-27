import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import { UserContext } from "@/context/UserContext";
import GlobalApi from "@/services/GlobalApi";
import RecipeCard from "@/components/RecipeCard";
import { Ionicons } from "@expo/vector-icons";

const CookBook = () => {
  const { user } = useContext(UserContext);
  const [recipeList, setRecipeList] = useState();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  useEffect(() => {
    if (activeTab === 1) {
      user && GetUserRecipeList();
    } else {
      user && savedUserRecipeList();
    }
  }, [user, activeTab]);
  const GetUserRecipeList = async () => {
    setLoading(true);
    try {
      const result = await GlobalApi.GetUserCreatedRecipe(user?.email);
      // console.log("cookbook:", result.data.data);
      setRecipeList(result.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const savedUserRecipeList = async () => {
    try {
      setLoading(true);
      //Fetch Save Document Id
      const result = await GlobalApi.SavedRecipeList(user?.email);
      console.log(result.data.data);
      const savedData = result.data.data;
      let QueryFilter = "";
      savedData.forEach((element: any) => {
        QueryFilter =
          QueryFilter +
          "filters[documentId][$in]=" +
          element?.recipeDocId +
          "&";
      });
      console.log(QueryFilter);
      // Pass Document Id To Fetch Recipes
      const resp = await GlobalApi.GetSavedRecipes(QueryFilter);
      // console.log("resp", resp.data.data);
      setRecipeList(resp.data.data);
    } catch (error) {
      console.log(error);
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
          fontSize: 35,
        }}
      >
        Cookbook
      </Text>
      <View style={[{ marginBottom: 6, gap: 10 }, styles.tabContainer]}>
        <TouchableOpacity
          onPress={() => {
            setActiveTab(1);
            GetUserRecipeList();
          }}
          style={[styles.tabContainer, { opacity: activeTab === 1 ? 1 : 0.4 }]}
        >
          <Ionicons name="sparkles-sharp" size={24} color={"black"} />
          <Text style={styles.tabText}>My Recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveTab(2);
            savedUserRecipeList();
          }}
          style={[styles.tabContainer, { opacity: activeTab === 2 ? 1 : 0.4 }]}
        >
          <Ionicons name="bookmark" size={24} color={"black"} />
          <Text style={styles.tabText}>Saved</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recipeList}
        numColumns={2}
        refreshing={loading}
        onRefresh={activeTab === 1 ? GetUserRecipeList : savedUserRecipeList}
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

export default CookBook;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 4,
  },
  tabText: {
    fontFamily: FONTFAMILY.outfit,
    fontSize: 20,
  },
});
