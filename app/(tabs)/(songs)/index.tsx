import { TrackList } from "@/components/TrackList";
import { colors, screenPadding } from "@/constants/tokens";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { defaultStyles } from "@/styles";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import library from "@/assets/data/library.json";
import { trackTitleFilter } from "@/helpers/filter";
import { useTracks } from "@/store/library";

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
        <TrackList tracks={filterTracks} scrollEnabled={false} />
      </ScrollView>
    </View>
  );
};

export default SongScreen;
