import { TrackList } from "@/components/TrackList";
import { colors, screenPadding } from "@/constants/tokens";
import { trackTitleFilter } from "@/helpers/filter";
import { generateTracksListId } from "@/helpers/miscellaneous";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useTracks } from "@/store/library";
import { defaultStyles } from "@/styles";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";

const SongScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in Songs",
      textColor: colors.text,
    },
  });

  const tracks = useTracks();

  const filterTracks = useMemo(() => {
    if (!search) return tracks;

    return tracks.filter(trackTitleFilter(search));
  }, [search, tracks]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <TrackList
          id={generateTracksListId("songs", search)}
          tracks={filterTracks}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default SongScreen;
