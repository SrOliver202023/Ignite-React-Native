import React, { useMemo } from 'react';

import {
  FlatList,
  Text,
  View
} from 'react-native';

import { Friend } from '../Friend';

interface Props {
  data: {
    id: number;
    name: string;
    likes: number;
    dateFormatted: string;
  }[];
  follow: () => void;

}

export function FriendFlatList({ data, follow }: Props) {

  // WITHOUT MEMO
  // Amigo 2 -> 108ms
  // Amigo 2 + totalLikes -> 94ms



  // WITH MEMO
  // Amigo 2 + totalLikes -> 44ms

  const totalLikes = useMemo(() => {
    return data.reduce((likes, friend) => {
      return likes + friend.likes;
    }, 0);
  }, [data]);

  return (
    <View style={{ paddingBottom: 135 }}>
      <Text>Total de likes : {totalLikes}</Text>

      <FlatList
        data={data}
        keyExtractor={(friend) => String(friend.id)}
        renderItem={({ item }) => (
          <Friend
            follow={follow}
            key={item.id}
            data={item}
          />
        )}
      />

    </View>
  );
}