import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/services/GlobalApi";
import { FONTFAMILY } from "@/theme/theme";
import { useRouter } from "expo-router";

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();
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
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/recipe-by-category",
                params: {
                  categoryName: item?.name,
                },
              })
            }
            style={styles.categoryContainer}
          >
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
          </TouchableOpacity>
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
