import { Tabs } from "expo-router";
import React, { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

export default function TabLayout() {
  function TabBarIcon({
    style,
    ...rest
  }: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
    return (
      <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF9900",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
