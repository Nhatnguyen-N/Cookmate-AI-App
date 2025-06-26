import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTFAMILY } from "@/theme/theme";

const Ingredient = ({ ingredients }: any) => {
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: FONTFAMILY.outfit_bold,
            fontSize: 20,
          }}
        >
          Ingredient
        </Text>
        <Text
          style={{
            fontFamily: FONTFAMILY.outfit,
            fontSize: 16,
          }}
        >
          {ingredients?.length} Items
        </Text>
      </View>
      <FlatList
        data={ingredients}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 7,
                padding: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  padding: 5,
                  backgroundColor: COLORS.SECONDARY,
                  borderRadius: 99,
                }}
              >
                {item?.icon}
              </Text>
              <Text style={{ fontFamily: FONTFAMILY.outfit, fontSize: 18 }}>
                {item?.ingredient}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTFAMILY.outfit,
                fontSize: 20,
                color: COLORS.GRAY,
              }}
            >
              {item?.quantity}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Ingredient;

const styles = StyleSheet.create({});
