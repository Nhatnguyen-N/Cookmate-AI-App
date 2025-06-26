import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import Button from "./Button";
import GlobalApi from "@/services/GlobalApi";
import Prompt from "../services/Prompt";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

import {
  GenerateRecipeAIModel,
  GenerateRecipeCompleteAIModel,
} from "@/services/AiModel";
import LoadingDialog from "./LoadingDialog";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "expo-router";
const CreateRecipe = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [recipeOptions, setRecipeOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [openLoading, setOpenLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  // console.log(user);
  const router = useRouter();
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
      console.log("generate", resp[0]?.recipeName);
      setRecipeOptions(resp);
      setLoading(false);
      actionSheetRef.current?.show();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
    console.log("option", option.recipeName);
    try {
      actionSheetRef.current?.hide();
      setTimeout(() => {
        setOpenLoading(true);
      }, 500);
      const PROMPT =
        "RecipeName:" +
        option?.recipeName +
        "Description:" +
        option?.description +
        Prompt.GENERATE_COMPLETE_RECIPE_PROMPT;
      const result = await GenerateRecipeCompleteAIModel.sendMessage(PROMPT);
      const resp = JSON.parse(result.response.text());
      console.log("resp", resp);

      let imagePrompt: string;
      let JSONContent: any;
      if (Array.isArray(resp)) {
        if (!resp[0]?.imagePrompt)
          throw new Error("Không tìm thấy imagePrompt trong array");
        imagePrompt = resp[0].imagePrompt;
        JSONContent = resp[0];
      } else if (typeof resp === "object" && resp !== null) {
        if (!resp.imagePrompt)
          throw new Error("Không tìm thấy imagePrompt trong object");
        imagePrompt = resp.imagePrompt;
        JSONContent = resp;
      } else {
        throw new Error("Response không hợp lệ");
      }

      const imageUrl = await GenerateRecipeImage(imagePrompt);
      console.log("JSONContent", JSONContent);

      const insertedRecordResult = await SaveToDb(
        JSONContent,
        imageUrl[0]
        // "https://modelslab-bom.s3.amazonaws.com/modelslab/4539e73f-8a38-4c1c-b757-0ccc9d228b42-0.jpg"
      );
      // console.log("insertedRecordResult", insertedRecordResult);

      router.push({
        pathname: "/recipe-detail",
        params: {
          recipeData: JSON.stringify(insertedRecordResult),
        },
      });
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
      // console.log("Generating image with prompt:", imagePrompt);
      if (!imagePrompt?.trim()) {
        throw new Error("Prompt không được trống");
      }

      const result = await GlobalApi.GenerateAiImageWithDeepAI(imagePrompt);
      const data = await result.json();
      console.log("data:", data.output);
      return data.output;
    } catch (error: any) {
      console.error("Error in GenerateRecipeImage:", error);
      throw error; // Re-throw để hàm cha bắt
    }
  };
  const SaveToDb = async (content: any, imageUrl: string) => {
    const data = {
      ...content,
      recipeImage: imageUrl,
      userEmail: user?.email,
    };
    const userData = {
      name: user?.name,
      email: user?.email,
      picture: user?.picture,
      credits: user?.credits - 1,
      pref: null,
    };
    const result = await GlobalApi.CreateNewRecipe(data);
    // const updateUser = await GlobalApi.UpdateUser(user?.documentId, userData);
    // console.log("Update User", updateUser);
    // setUser(updateUser);
    return result.data.data;
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
