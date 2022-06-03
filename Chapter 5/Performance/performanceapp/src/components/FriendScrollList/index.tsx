import React, { useMemo } from 'react';

import {
  Text,
  View,
  ScrollView,
  StyleSheet
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

export function FriendScrollList({ data, follow }: Props) {

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
    <ScrollView style={styles.list}>

      <View>
        <Text>Total de likes : {totalLikes}</Text>

        {
          data.map((friendData) => (
            <Friend
              follow={follow}
              key={friendData.id}
              data={friendData}
            />
          ))
        }

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    marginTop: 100,
    padding: 25
  },
  input: {
    borderWidth: 1,
    padding: 7,
    marginVertical: 10
  },
  list: {
    marginTop: 20
  }

});