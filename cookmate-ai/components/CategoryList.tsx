import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/services/GlobalApi";
import { FONTFAMILY } from "@/theme/theme";

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    GetCategoryList();
  }, []);
  const GetCategoryList = async () => {
    const result = await GlobalApi.GetCategories();
    // console.log(result.data.data);
    setCategoryList(result?.data?.data);
  };
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <Text style={styles.heading}>CategoryList</Text>
      <FlatList
        data={categoryList}
        scrollEnabled={false}
        numColumns={4}
        renderItem={({ item, index }: any) => (
          <View style={styles.categoryContainer}>
            <Image
              source={{ uri: item?.image?.url }}
              style={{
                width: 40,
                height: 40,
              }}
            />
            <Text
              style={{
                fontFamily: FONTFAMILY.outfit,
                marginTop: 3,
              }}
            >
              {item?.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  heading: {
    fontFamily: FONTFAMILY.outfit_bold,
    fontSize: 20,
  },
  categoryContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
});
