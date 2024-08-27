import { colors } from "@/constants/tokens";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable, View, ViewStyle } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";

interface PlayerControlsProps {
  style?: ViewStyle;
}

interface PlayerButtonProps {
  style?: ViewStyle;
  iconSize: number;
}

export const PlayPauseButton = ({ style, iconSize }: PlayerButtonProps) => {
  const { playing } = useIsPlaying();

  return (
    <View style={[{ height: iconSize }, style]}>
      <Pressable onPress={playing ? TrackPlayer.pause : TrackPlayer.play}>
        <FontAwesome6
          name={playing ? "pause" : "play"}
          size={iconSize}
          color={colors.text}
        />
      </Pressable>
    </View>
  );
};

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  return (
    <Pressable onPress={() => TrackPlayer.skipToNext()}>
      <FontAwesome6 name="forward" size={iconSize} color={colors.text} />
    </Pressable>
  );
};

export const SkipToPrevButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  return (
    <Pressable onPress={() => TrackPlayer.skipToPrevious()}>
      <FontAwesome6 name="backward" size={iconSize} color={colors.text} />
    </Pressable>
  );
};
