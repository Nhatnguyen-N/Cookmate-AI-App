import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Marquee } from "@animatereactnative/marquee";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { COLORS, FONTFAMILY } from "@/theme/theme";
import { useLogto } from "@logto/rn";
import * as WebBrowser from "expo-web-browser";
export default function Landing() {
  const imageList = [
    require("../assets/images/1.jpg"),
    require("../assets/images/c1.jpg"),
    require("../assets/images/2.jpg"),
    require("../assets/images/c2.jpg"),
    require("../assets/images/3.jpg"),
    require("../assets/images/c3.jpg"),
    require("../assets/images/4.jpg"),
    require("../assets/images/5.jpg"),
    require("../assets/images/6.jpg"),
  ];
  const { signIn, signOut, isAuthenticated } = useLogto();
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <SafeAreaView>
          <Marquee
            spacing={10}
            speed={0.7}
            style={{
              transform: [{ rotate: "-4deg" }],
            }}
          >
            <View style={styles.imageContainer}>
              {imageList.map((image, index) => (
                <Image source={image} key={index} style={styles.image} />
              ))}
            </View>
          </Marquee>
          <Marquee
            spacing={10}
            speed={0.4}
            style={{
              transform: [{ rotate: "-4deg" }],
              marginTop: 10,
            }}
          >
            <View style={styles.imageContainer}>
              {imageList.map((image, index) => (
                <Image source={image} key={index} style={styles.image} />
              ))}
            </View>
          </Marquee>
          <Marquee
            spacing={10}
            speed={0.5}
            style={{
              transform: [{ rotate: "-4deg" }],
              marginTop: 10,
            }}
          >
            <View style={styles.imageContainer}>
              {imageList.map((image, index) => (
                <Image source={image} key={index} style={styles.image} />
              ))}
            </View>
          </Marquee>
        </SafeAreaView>
        <View
          style={{
            backgroundColor: COLORS.WHITE,
            height: "100%",
            padding: 20,
          }}
        >
          <Text
            style={{
              fontFamily: FONTFAMILY.outfit_bold,
              fontSize: 30,
              textAlign: "center",
            }}
          >
            Cookmate AI 🥗🔍 | Find, Create & Enjoy Delicious Recipes!
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: FONTFAMILY.outfit,
              fontSize: 17,
              color: COLORS.GRAY,
              marginTop: 7,
            }}
          >
            Generate delicious recipes in seconds with the power of AI! 🍔✨
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => signIn("cookmateai://callback")}
          >
            <Text
              style={{
                textAlign: "center",
                color: COLORS.WHITE,
                fontSize: 17,
                fontFamily: FONTFAMILY.outfit,
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
          {/* <Button title="Sign out" onPress={async () => signOut()} /> */}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    gap: 10,
  },
  image: { width: 160, height: 160, borderRadius: 25 },
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
  },
});
