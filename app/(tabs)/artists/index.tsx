import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import React, { useMemo } from "react";
import { defaultStyles, utilsStyles } from "@/styles";
import { useArtists } from "@/store/library";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { colors, screenPadding } from "@/constants/tokens";
import { artistNameFilter } from "@/helpers/filter";
import FastImage from "react-native-fast-image";
import { unknownArtistImageUri } from "@/constants/images";
import { Link } from "expo-router";

const ArtistScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in artists",
      textColor: colors.text,
    },
  });
  const artists = useArtists();

  const filteredArtists = useMemo(() => {
    if (!search) return artists;

    return artists.filter(artistNameFilter(search));
  }, [artists, search]);

  const ItemSeparatorComponent = () => {
    return (
      <View
        style={{
          ...utilsStyles.itemSeparator,
          marginVertical: 12,
          marginLeft: 50,
        }}
      />
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View>
        <Text
          style={{
            ...defaultStyles.text,
            textAlign: "center",
            fontSize: 24,
            color: colors.textMuted,
          }}
        >
          No artist found
        </Text>

        <FastImage
          source={{
            uri: unknownArtistImageUri,
            priority: FastImage.priority.normal,
          }}
          style={{ ...utilsStyles.emptyContentImage }}
        />
      </View>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        style={{ paddingHorizontal: screenPadding.horizontal }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <FlatList
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
          data={filteredArtists}
          scrollEnabled={false}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListFooterComponent={ItemSeparatorComponent}
          ListEmptyComponent={ListEmptyComponent}
          renderItem={({ item: artist }) => {
            return (
              <Link
                href={{
                  pathname: "/artists/[name]",
                  params: { name: artist.name },
                }}
                asChild
              >
                <TouchableHighlight activeOpacity={0.8}>
                  <View style={styles.artistItemContainer}>
                    <View>
                      <FastImage
                        source={{
                          uri: unknownArtistImageUri,
                          priority: FastImage.priority.normal,
                        }}
                        style={styles.artistImage}
                      />
                    </View>

                    <View style={{ width: "100%" }}>
                      <Text numberOfLines={1} style={styles.artistNameText}>
                        {artist.name}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </Link>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default ArtistScreen;

const styles = StyleSheet.create({
  artistItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
  },
  artistImage: {
    width: 40,
    height: 40,
    borderRadius: 32,
  },
  artistNameText: {
    ...defaultStyles.text,
    fontSize: 17,
    maxWidth: "80%",
  },
});
