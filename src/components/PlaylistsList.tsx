import { View, Text, FlatListProps, FlatList, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { PlayList } from "@/helpers/type";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { colors, screenPadding } from "@/constants/tokens";
import { playlistNameFilter } from "@/helpers/filter";
import { utilsStyles } from "@/styles";
import FastImage from "react-native-fast-image";
import { unknownTrackImageUri } from "@/constants/images";
import PlaylistListItem from "@/components/PlaylistListItem";

type playlistsListProp = {
  playlists: PlayList[];
  onPlaylistPress: (playlist: PlayList) => void;
} & Partial<FlatListProps<PlayList>>;

const PlaylistsList = ({
  playlists,
  onPlaylistPress,
  ...flatListProps
}: playlistsListProp) => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in playlist",
      textColor: colors.text,
    },
  });

  const filterPlaylists = useMemo(() => {
    return playlists.filter(playlistNameFilter(search));
  }, []);

  const ItemDivider = () => {
    return <View style={{ ...utilsStyles.itemSeparator, ...styles.divider }} />;
  };

  const ListEmptyComponent = () => {
    return (
      <View>
        <Text style={utilsStyles.emptyContentText}>No Sound Found</Text>

        <FastImage
          source={{
            uri: unknownTrackImageUri,
            priority: FastImage.priority.normal,
          }}
          style={utilsStyles.emptyContentImage}
        />
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={{ paddingHorizontal: screenPadding.horizontal }}
      data={filterPlaylists}
      ItemSeparatorComponent={ItemDivider}
      ListFooterComponent={ItemDivider}
      ListEmptyComponent={ListEmptyComponent}
      {...flatListProps}
      renderItem={({ item: playlist }) => (
        <PlaylistListItem
          playlist={playlist}
          onPress={() => onPlaylistPress(playlist)}
        />
      )}
    />
  );
};

export default PlaylistsList;

const styles = StyleSheet.create({
  divider: {
    marginLeft: 80,
    marginVertical: 12,
  },
});
