import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTFAMILY } from "@/theme/theme";

const RecipeSteps = ({ steps }: any) => {
  return (
    <View style={{ marginTop: 15 }}>
      <Text
        style={{
          fontFamily: FONTFAMILY.outfit_bold,
          fontSize: 20,
        }}
      >
        RecipeSteps
      </Text>
      <FlatList
        data={steps}
        renderItem={({ item, index }) => (
          <View
            style={{
              alignItems: "center",
              marginTop: 6,
              padding: 10,
              borderRadius: 15,
              borderWidth: 0.3,
              flex: 1,
              flexDirection: "row",
              gap: 7,
            }}
          >
            <Text
              style={[
                styles.text,
                {
                  padding: 10,
                  width: 40,
                  textAlign: "center",
                  borderRadius: 7,
                  backgroundColor: COLORS.SECONDARY,
                },
              ]}
            >
              {item.split(".")[0]}.
            </Text>

            <Text style={[styles.text, { flex: 1 }]}>
              {item.split(".").slice(1).join(".")}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default RecipeSteps;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTFAMILY.outfit,
    fontSize: 18,
  },
});
