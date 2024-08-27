import { useEffect } from "react";
import Animated, {
  StyleProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";

interface MovingTextProps {
  text: string;
  style?: StyleProps;
  animationThreshold: number;
}

export const MovingText = ({
  text,
  animationThreshold,
  style,
}: MovingTextProps) => {
  const translateX = useSharedValue(0);
  const shouldAniamte = text.length >= animationThreshold;

  const textWidth = text.length * 3;

  const aniamtedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  useEffect(() => {
    if (!shouldAniamte) return;

    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textWidth, { duration: 5000, easing: Easing.linear }),
        -1,
        true
      )
    );

    return () => {
      cancelAnimation(translateX);
      translateX.value = 0;
    };
  }, [translateX, text, shouldAniamte, textWidth, animationThreshold]);

  return (
    <Animated.Text
      style={[
        style,
        aniamtedStyle,
        shouldAniamte && {
          width: 9999, //preventing the ellipsis from being shown
          paddingLeft: 16, // avoid the initial character being bearly visible
        },
      ]}
      numberOfLines={1}
    >
      {text}
    </Animated.Text>
  );
};
