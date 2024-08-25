import { TrackList } from "@/components/TrackList";
import { colors, screenPadding } from "@/constants/tokens";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { defaultStyles } from "@/styles";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import library from "@/assets/data/library.json";
import { trackTitleFilter } from "@/helpers/filter";

const SongScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in Songs",
      textColor: colors.text,
    },
  });

  const filterTracks = useMemo(() => {
    if (!search) return library;

    return library.filter(trackTitleFilter(search));
  }, [search]);

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
