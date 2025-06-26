import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import { useRouter } from "expo-router";
const RecipeCard = ({ recipe }: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/recipe-detail",
          params: {
            recipeData: JSON.stringify(recipe),
          },
        })
      }
      style={{
        margin: 5,
      }}
    >
      <Image
        source={{ uri: recipe?.recipeImage }}
        style={{
          width: "100%",
          height: 220,
          borderRadius: 20,
        }}
      />
      <LinearGradient
        style={{
          position: "absolute",
          bottom: 0,
          padding: 10,
          width: "100%",
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
        colors={["transparent", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.8)"]}
      >
        <View>
          <Text
            style={{
              color: COLORS.WHITE,
              fontFamily: FONTFAMILY.outfit,
              fontSize: 16,
            }}
          >
            {recipe?.recipeName}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({});
