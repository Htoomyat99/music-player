import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

const playListScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerTitle: "playListScreens" }}
        />
      </Stack>
    </View>
  );
};

export default playListScreenLayout;
