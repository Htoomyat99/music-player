import PlaylistsList from "@/components/PlaylistsList";
import { colors, screenPadding } from "@/constants/tokens";
import { playlistNameFilter } from "@/helpers/filter";
import { PlayList } from "@/helpers/type";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { usePlaylists } from "@/store/library";
import { defaultStyles } from "@/styles";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";

const PlayListScreen = () => {
  const router = useRouter();
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in playlists",
      textColor: colors.text,
    },
  });

  const { playlists } = usePlaylists();

  const filteredPlaylists = useMemo(() => {
    if (!search) return playlists;

    return playlists.filter(playlistNameFilter(search));
  }, [search, playlists]);

  const handlePlaylistPress = (playlist: PlayList) => {
    router.push(`/(tabs)/playlists/${playlist.name}`);
  };

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <PlaylistsList
          scrollEnabled={false}
          playlists={filteredPlaylists}
          onPlaylistPress={handlePlaylistPress}
        />
      </ScrollView>
    </View>
  );
};

export default PlayListScreen;
