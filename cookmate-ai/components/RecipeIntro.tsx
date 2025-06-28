import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import GlobalApi from "@/services/GlobalApi";
import { UserContext } from "@/context/UserContext";

const RecipeIntro = ({ recipe, isFav }: any) => {
  const { user } = useContext(UserContext);
  const [saved, setSaved] = useState(false);

  const SaveRecipe = async () => {
    const data = {
      userEmail: user?.email,
      recipeDocId: recipe?.documentId,
    };
    const result = await GlobalApi.SaveUserFavRecipe(data);
    console.log(result);
    Alert.alert("Saved!", "Recipe Saved in your cookbook!");
    setSaved(isFav);
  };
  const removeSavedRecipe = () => {
    // Removed Saved Recipe
  };
  return (
    <View>
      <Image
        source={{ uri: recipe?.recipeImage }}
        style={{
          width: "100%",
          height: 240,
          borderRadius: 20,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          // justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: FONTFAMILY.outfit,
              fontSize: 25,
              marginTop: 7,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {recipe?.recipeName}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => (!saved ? SaveRecipe() : removeSavedRecipe())}
        >
          {!isFav ? (
            <Ionicons name="bookmark-outline" size={24} color={"black"} />
          ) : (
            <Ionicons name="bookmark" size={24} color={"red"} />
          )}
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontFamily: FONTFAMILY.outfit_bold,
          fontSize: 20,
          marginTop: 7,
        }}
      >
        Description
      </Text>
      <Text
        style={{
          fontFamily: FONTFAMILY.outfit,
          fontSize: 17,
          color: COLORS.GRAY,
          marginTop: 3,
        }}
      >
        {recipe?.description}
      </Text>
      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 5,
        }}
      >
        <View style={styles.featureContainer}>
          <Ionicons name="leaf" size={18} color={COLORS.PRIMARY} />
          <View style={{}}>
            <Text style={styles.mainText}>{recipe?.calories} Cal</Text>
            <Text>Calories</Text>
          </View>
        </View>

        <View style={styles.featureContainer}>
          <Ionicons name="timer" size={18} color={COLORS.PRIMARY} />
          <View style={{}}>
            <Text style={styles.mainText}>{recipe?.cookTime} Min</Text>
            <Text>Time</Text>
          </View>
        </View>

        <View style={styles.featureContainer}>
          <Ionicons name="people" size={18} color={COLORS.PRIMARY} />
          <View style={{}}>
            <Text style={styles.mainText}>{recipe?.serveTo} Serve</Text>
            <Text>Serve</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecipeIntro;

const styles = StyleSheet.create({
  featureContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    padding: 15,
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 15,
  },
  mainText: {
    fontFamily: FONTFAMILY.outfit,
    fontSize: 18,
    color: COLORS.PRIMARY,
  },
});
