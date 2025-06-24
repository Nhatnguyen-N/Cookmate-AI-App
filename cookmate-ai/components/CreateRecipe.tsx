import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import Button from "./Button";
import GlobalApi from "@/services/GlobalApi";
import Prompt from "../services/Prompt";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

import {
  GenerateImageRecipeAIModel,
  GenerateRecipeAIModel,
  GenerateRecipeCompleteAIModel,
} from "@/services/AiModel";
import LoadingDialog from "./LoadingDialog";
const CreateRecipe = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [recipeOptions, setRecipeOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [openLoading, setOpenLoading] = useState(false);
  // const OnGenerate = async () => {
  //   if (!userInput.trim()) {
  //     Alert.alert("Error", "Please enter valid input");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const result = await GlobalApi.AiModel(
  //       userInput + GENERATE_RECIPE_OPTION_PROMPT
  //     );

  //     console.log("API Content:", result?.choices[0].message?.content);

  //     try {
  //       const content = result?.choices[0].message?.content;
  //       if (!content) throw new Error("Empty content");

  //       const parsedData = JSON.parse(content);
  //       setRecipeOptions(parsedData);
  //       await new Promise((resolve) => setTimeout(resolve, 0)); // Đợi render
  //       actionSheetRef.current?.show();
  //     } catch (parseError) {
  //       console.error("Parse Error:", parseError);
  //       Alert.alert("Format Error", "Cannot process recipe data");
  //     }
  //   } catch (error: any) {
  //     console.error("API Error:", error);
  //     Alert.alert(
  //       "Error",
  //       error.response?.status === 429
  //         ? "Please wait before trying again"
  //         : "Failed to generate recipe"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const OnGenerate = async () => {
    if (!userInput.trim()) {
      Alert.alert("Error", "Please enter valid input");
      return;
    }
    try {
      setLoading(true);
      const PROMPT = userInput + Prompt.GENERATE_RECIPE_OPTION_PROMPT;
      const result = await GenerateRecipeAIModel.sendMessage(PROMPT);
      const resp = JSON.parse(result.response.text());
      setRecipeOptions(resp);
      setLoading(false);
      actionSheetRef.current?.show();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const TestLoading = () => {
    actionSheetRef.current?.show();
    setTimeout(() => {
      actionSheetRef.current?.hide();
      setOpenLoading(true);
    }, 3000);
    setTimeout(() => {
      setOpenLoading(false);
    }, 5000);
  };
  // const GenerateCompleteRecipe = async (option: any) => {
  //   try {
  //     setOpenLoading(true);
  //     actionSheetRef.current?.hide();
  //     const PROMPT =
  //       "RecipeName:" +
  //       option?.recipeName +
  //       "Description:" +
  //       option?.description +
  //       Prompt.GENERATE_COMPLETE_RECIPE_PROMPT;
  //     const result = await GenerateRecipeCompleteAIModel.sendMessage(PROMPT);
  //     const resp = JSON.parse(result.response.text());
  //     console.log("resp", resp);
  //     let imagePrompt: string;
  //     if (Array.isArray(resp)) {
  //       // Nếu resp là array -> lấy phần tử đầu tiên
  //       if (!resp[0]?.imagePrompt)
  //         throw new Error("Không tìm thấy imagePrompt trong array");
  //       imagePrompt = resp[0].imagePrompt;
  //     } else if (typeof resp === "object" && resp !== null) {
  //       // Nếu resp là object
  //       if (!resp.imagePrompt)
  //         throw new Error("Không tìm thấy imagePrompt trong object");
  //       imagePrompt = resp.imagePrompt;
  //     } else {
  //       throw new Error("Response không hợp lệ");
  //     }
  //     console.log("imagePrompt", imagePrompt);

  //     setTimeout(async () => {
  //       await GenerateRecipeImage(imagePrompt);
  //       setOpenLoading(false);
  //     }, 5000);
  //   } catch (error: any) {
  //     console.error("Error in GenerateCompleteRecipe:", error);
  //     Alert.alert("Error", "Failed to generate recipe: " + error.message);
  //   }
  // };
  // const GenerateRecipeImage = async (imagePrompt: string) => {
  //   try {
  //     console.log("Generating image with prompt:", imagePrompt);
  //     if (!imagePrompt) {
  //       throw new Error("imagePrompt error");
  //     }
  //     console.log("Calling image generation API...");
  //     const result = await GlobalApi.GenerateAiImage("A simple red apple");
  //     if (!result?.data?.image) {
  //       throw new Error("Invalid image response");
  //     }
  //     console.log("Result Iamge:", result.data.image);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const GenerateCompleteRecipe = async (option: any) => {
    try {
      actionSheetRef.current?.hide();
      setTimeout(() => {
        setOpenLoading(true);
      }, 500);
      // await new Promise((resolve) => requestAnimationFrame(resolve));
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const PROMPT =
        "RecipeName:" +
        option?.recipeName +
        "Description:" +
        option?.description +
        Prompt.GENERATE_COMPLETE_RECIPE_PROMPT;

      // Thêm timeout cho API call
      // const timeoutPromise = new Promise((_, reject) =>
      //   setTimeout(() => reject(new Error("Request timeout")), 20000)
      // );

      // const result: any = await Promise.race([
      const result = await GenerateRecipeCompleteAIModel.sendMessage(PROMPT);

      //   timeoutPromise,
      // ]);

      const resp = JSON.parse(result.response.text());
      console.log("resp", resp);

      let imagePrompt: string;
      if (Array.isArray(resp)) {
        if (!resp[0]?.imagePrompt)
          throw new Error("Không tìm thấy imagePrompt trong array");
        imagePrompt = resp[0].imagePrompt;
      } else if (typeof resp === "object" && resp !== null) {
        if (!resp.imagePrompt)
          throw new Error("Không tìm thấy imagePrompt trong object");
        imagePrompt = resp.imagePrompt;
      } else {
        throw new Error("Response không hợp lệ");
      }

      console.log("imagePrompt", imagePrompt);
      await GenerateRecipeImage(imagePrompt);
    } catch (error: any) {
      console.error("Error in GenerateCompleteRecipe:", error);
      Alert.alert("Error", error.message);
    } finally {
      setOpenLoading(false);
      console.log("Loading dialog hidden");
    }
  };
  const GenerateRecipeImage = async (imagePrompt: string) => {
    try {
      console.log("Generating image with prompt:", imagePrompt);
      if (!imagePrompt?.trim()) {
        throw new Error("Prompt không được trống");
      }

      // Thêm timeout cho API call
      // const timeoutPromise = new Promise((_, reject) =>
      //   setTimeout(() => reject(new Error("Image generation timeout")), 20000)
      // );

      console.log("Calling image generation API...");
      // const result: any = await Promise.race([
      const result = await GenerateImageRecipeAIModel.sendMessage(imagePrompt); // Sử dụng imagePrompt thực tế
      //   timeoutPromise,
      // ]);
      const resp = JSON.parse(result.response.text());
      if (!resp) {
        throw new Error("Invalid image response");
      }

      console.log("Image generated successfully");
      console.log(resp);

      // return result.data.image;
    } catch (error: any) {
      console.error("Error in GenerateRecipeImage:", error);
      throw error; // Re-throw để hàm cha bắt
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
        // onPress={() => GenerateRecipeImage("a red apple")}
        // onPress={() => TestLoading()}
        loading={loading}
        icon={"sparkles"}
      />
      <LoadingDialog visible={openLoading} />
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContainer}>
          <Text style={styles.heading}>Select Recipe</Text>
          <View>
            {recipeOptions &&
              recipeOptions?.map((item: any, index: any) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recipeOptionContainer}
                  onPress={() => GenerateCompleteRecipe(item)}
                >
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
                </TouchableOpacity>
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
