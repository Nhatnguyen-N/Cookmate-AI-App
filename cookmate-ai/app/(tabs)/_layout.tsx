import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("../../assets/images/i1.png")}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.4,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("../../assets/images/i2.png")}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.4,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cookbook"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("../../assets/images/i3.png")}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.4,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("../../assets/images/i4.png")}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.4,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
