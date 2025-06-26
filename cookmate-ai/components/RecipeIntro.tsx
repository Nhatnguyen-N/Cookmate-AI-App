import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";

const RecipeIntro = ({ recipe }: any) => {
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
      <Text
        style={{
          fontFamily: FONTFAMILY.outfit,
          fontSize: 25,
          marginTop: 7,
        }}
      >
        {recipe?.recipeName}
      </Text>
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
