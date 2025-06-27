import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import { useRouter } from "expo-router";

const RecipeCardHome = ({ recipe }: any) => {
  const router = useRouter();
  const cardWidth = useWindowDimensions().width * 0.65;
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
        margin: 8,
        width: cardWidth,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3, // Android
      }}
    >
      <View style={{ borderRadius: 15, overflow: "hidden" }}>
        <Image
          source={{ uri: recipe?.recipeImage }}
          style={{
            width: "100%", // Chiếm full width của parent
            aspectRatio: 1, // Tỉ lệ ảnh phổ biến (hoặc 1.57:1 tương đương 220:140)
            resizeMode: "cover", // Đảm bảo ảnh phủ kín không bị méo
          }}
        />
        <LinearGradient
          style={{
            position: "absolute",
            bottom: 0,
            padding: 10,
            paddingVertical: 12,
            paddingHorizontal: 10,
          }}
          colors={["transparent", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.8)"]}
        >
          <Text
            style={{
              color: COLORS.WHITE,
              fontFamily: FONTFAMILY.outfit,
              fontSize: 16,
              lineHeight: 30,
            }}
          >
            {recipe?.recipeName}
          </Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCardHome;

const styles = StyleSheet.create({});
