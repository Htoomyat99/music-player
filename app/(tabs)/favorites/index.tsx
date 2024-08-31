import { TrackList } from "@/components/TrackList";
import { colors, screenPadding } from "@/constants/tokens";
import { trackTitleFilter } from "@/helpers/filter";
import { generateTracksListId } from "@/helpers/miscellaneous";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useFavorite } from "@/store/library";
import { defaultStyles } from "@/styles";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";

const FavoriteScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in songs",
      textColor: colors.text,
    },
  });

  const favoriteTracks = useFavorite().favorites;

  const filterFavoritesTracks = useMemo(() => {
    if (!search) return favoriteTracks;

    return favoriteTracks.filter(trackTitleFilter(search));
  }, [search, favoriteTracks]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <TrackList
          id={generateTracksListId("favorites", search)}
          tracks={filterFavoritesTracks}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default FavoriteScreen;
