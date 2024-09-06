import { FloatingPlayer } from "@/components/FloatingPlayer";
import { colors, fontSize } from "@/constants/tokens";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { verticalScale, scale, moderateScale } from "react-native-size-matters";

const TabsNavigation = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: {
            fontSize: fontSize.xs,
            fontWeight: "500",
          },
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            borderTopLeftRadius: moderateScale(20),
            borderTopRightRadius: moderateScale(20),
            borderTopWidth: 0,
            paddingTop: moderateScale(8),
            paddingBottom:
              Platform.OS === "android" ? moderateScale(10) : moderateScale(25),
            height:
              Platform.OS === "ios" ? verticalScale(65) : verticalScale(55),
          },
          tabBarBackground: () => (
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              intensity={80}
              tint="dark"
              style={{
                ...StyleSheet.absoluteFillObject,
                overflow: "hidden",
                borderTopLeftRadius: moderateScale(20),
                borderTopRightRadius: moderateScale(20),
              }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="heart" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            title: "PlayLists",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="playlist-play"
                size={26}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(songs)"
          options={{
            title: "Songs",
            tabBarIcon: ({ color }) => (
              <Ionicons name="musical-notes-sharp" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            title: "Artists",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="users-line" size={20} color={color} />
            ),
          }}
        />
      </Tabs>

      <FloatingPlayer
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          bottom: 78,
        }}
      />
    </>
  );
};

export default TabsNavigation;
