import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import Button from "./Button";
import GlobalApi from "@/services/GlobalApi";
import GENERATE_RECIPE_OPTION_PROMPT from "../services/Prompt";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
const CreateRecipe = () => {
  const [userInput, setUserInput] = useState<string>();
  const [recipeOptions, setRecipeOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const OnGenerate = async () => {
    if (!userInput) {
      Alert.alert("Please enter details");
      return;
    }
    try {
      setLoading(true);
      const result = await GlobalApi.AiModel(
        userInput + GENERATE_RECIPE_OPTION_PROMPT
      );
      console.log(result?.choices[0].message);
      setRecipeOptions(result?.choices[0].message?.content);
      setLoading(false);
      actionSheetRef.current?.show();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/pan.gif")}
        style={styles.panImage}
      />
      <Text style={styles.heading}>
        Warm up your stove, and let&apos;s get cooking!
      </Text>
      <Text style={styles.subHeading}>Make something for your LOVE</Text>
      <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={3}
        placeholder="What your want to create? Add ingredients etc."
        placeholderTextColor={COLORS.GRAY}
        value={userInput}
        onChangeText={(value) => setUserInput(value)}
      />
      <Button
        label="Generate Recipe"
        onPress={() => OnGenerate()}
        loading={loading}
        icon={"sparkles"}
      />
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContainer}>
          <Text style={styles.heading}>Select Recipe</Text>
          <View>
            {recipeOptions?.map((item: any, index: any) => (
              <View key={index} style={styles.recipeOptionContainer}>
                <Text
                  style={{ fontFamily: FONTFAMILY.outfit_bold, fontSize: 16 }}
                >
                  {item?.recipeName}
                </Text>
                <Text
                  style={{
                    fontFamily: FONTFAMILY.outfit,
                    color: COLORS.GRAY,
                  }}
                >
                  {item?.description}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ActionSheet>
    </View>
  );
};

export default CreateRecipe;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    paddingBottom: 15,
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 25,
    alignItems: "center",
  },
  panImage: {
    width: 80,
    height: 80,
  },
  heading: {
    fontFamily: FONTFAMILY.outfit,
    fontSize: 23,
    textAlign: "center",
  },
  subHeading: {
    fontFamily: FONTFAMILY.outfit,
    fontSize: 16,
    marginTop: 6,
  },
  textInput: {
    backgroundColor: COLORS.WHITE,
    width: "100%",
    borderRadius: 15,
    height: 120,
    marginTop: 8,
    padding: 15,
    fontSize: 16,
  },
  actionSheetContainer: {
    padding: 25,
  },
  recipeOptionContainer: {
    padding: 15,
    borderWidth: 0.2,
    borderRadius: 15,
    marginTop: 15,
  },
});
