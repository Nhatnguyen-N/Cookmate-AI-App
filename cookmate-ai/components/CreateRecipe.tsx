import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import Button from "./Button";

const CreateRecipe = () => {
  const [userInput, setUserInput] = useState<string>();
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
        onPress={() => console.log("On Button Press")}
        icon={"sparkles"}
      />
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
});
