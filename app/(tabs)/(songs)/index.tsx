import { defaultStyles } from "@/styles";
import { Text, View } from "react-native";

const SongScreen = () => {
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.text}>Songs</Text>
    </View>
  );
};

export default SongScreen;
