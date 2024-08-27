import { useCallback, useEffect, useState } from "react";
import TrackPlayer from "react-native-track-player";

export const useTrackplayerVolume = () => {
  const [volume, setVolume] = useState<number | undefined>(undefined);

  const getVolume = useCallback(async () => {
    const currentVolume = await TrackPlayer.getVolume();
    setVolume(currentVolume);
  }, []);

  useEffect(() => {
    getVolume();
  }, [getVolume]);

  const updateVolume = useCallback(async (newVolume: number) => {
    if (newVolume < 0 || newVolume > 1) return;

    setVolume(newVolume);

    await TrackPlayer.setVolume(newVolume);
  }, []);

  return {
    volume,
    updateVolume,
  };
};
