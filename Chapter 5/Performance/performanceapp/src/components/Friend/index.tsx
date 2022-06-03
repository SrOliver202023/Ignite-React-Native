import React, { memo } from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';


interface Props {
  data: {
    name: string;
    likes: number;
    dateFormatted: string;
  };

  follow: () => void;
}


export function FriendComponent({ data, follow }: Props) {

  return (
    <View style={styles.container}>
      <Text>
        {data.name} - Likes: {data.likes}
      </Text>

      <Text>
        {
          !!data.dateFormatted ?
            `Oline em : ${data.dateFormatted}` :
            'Offline'
        }
      </Text>

      <TouchableOpacity onPress={follow}>
        <Text>Deixar de seguir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    borderBottomWidth: 0.2,
    paddingBottom: 8
  }


});


export const Friend = memo(FriendComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
});