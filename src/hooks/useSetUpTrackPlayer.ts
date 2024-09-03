import { useEffect, useRef } from "react";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RatingType,
  RepeatMode,
} from "react-native-track-player";

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10,
  });

  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
    },
    ratingType: RatingType.Heart,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
  });
  await TrackPlayer.setVolume(0.5); // not too loud
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

export const useSetUpTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
  const isInilialized = useRef(false);

  useEffect(() => {
    setupPlayer()
      .then(() => {
        isInilialized.current = true;
        onLoad?.();
      })
      .catch((error) => {
        isInilialized.current = false;
        console.error(error);
      });
  }, [onLoad]);
};
