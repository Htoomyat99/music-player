import { TrackList } from "@/components/TrackList";
import { screenPadding } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { ScrollView, Text, View } from "react-native";
import library from "@/assets/data/library.json";
import { useMemo } from "react";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";

const FavoriteScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in songs",
    },
  });

  const favoriteTracks = useMemo(() => {
    return library.filter((track) => track.rating === 1);
  }, []);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <TrackList tracks={favoriteTracks} scrollEnabled={false} />
      </ScrollView>
    </View>
  );
};

export default FavoriteScreen;
