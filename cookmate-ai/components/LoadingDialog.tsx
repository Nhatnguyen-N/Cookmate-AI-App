import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTFAMILY } from "@/theme/theme";

const LoadingDialog = ({ visible = false, text = "Loading..." }: any) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.overlay}>
        <View
          style={{
            padding: 20,
            borderRadius: 15,
            backgroundColor: COLORS.PRIMARY,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={COLORS.WHITE} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingDialog;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000070",
  },
  text: {
    marginTop: 10,
    color: COLORS.WHITE,
    fontSize: 16,
    fontFamily: FONTFAMILY.outfit,
  },
});
