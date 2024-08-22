import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { View } from "react-native";

const favoriteLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: "Favorites" }} />
      </Stack>
    </View>
  );
};

export default favoriteLayout;
