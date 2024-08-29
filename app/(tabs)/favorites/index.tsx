import library from "@/assets/data/library.json";
import { TrackList } from "@/components/TrackList";
import { screenPadding } from "@/constants/tokens";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { defaultStyles } from "@/styles";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";

const FavoriteScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in songs",
    },
  });

  console.log("search >>>", search);

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
