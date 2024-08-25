import { useEffect, useRef } from "react";
import TrackPlayer, { RepeatMode } from "react-native-track-player";

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10,
  });

  await TrackPlayer.setVolume(0.03); // not too loud
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
