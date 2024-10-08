import PlaylistListItem from "@/components/PlaylistListItem";
import { unknownTrackImageUri } from "@/constants/images";
import { colors } from "@/constants/tokens";
import { playlistNameFilter } from "@/helpers/filter";
import { PlayList } from "@/helpers/type";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { utilsStyles } from "@/styles";
import React, { useMemo } from "react";
import { FlatList, FlatListProps, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";

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
  }, [playlists, search]);

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
