import React, { useCallback, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,

} from 'react-native';
import { FriendFlatList } from '../../components/FriendFlatList';
import { FriendScrollList } from '../../components/FriendScrollList';


interface Data {
  id: number;
  name: string;
  likes: number;
  dateFormatted: string;
}

export function Home() {
  const [name, setName] = useState('');
  const [friends, setFriends] = useState([] as Data[]);


  async function handleSearch() {
    const response = await fetch(`http://192.168.1.28:3333/friends?q=${name}`);
    const data: Data[] = await response.json();

    const newData = data.map((item) => {
      return {
        ...item,
        dateFormatted: `${new Date().getHours()}:${new Date().getMinutes()}`
      };
    });

    setFriends(newData);
  }

  const handleFollow = useCallback(() => {
    console.log('Follow User!');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amigos</Text>
      <TextInput
        style={styles.input}
        placeholder='Nome do cliente'
        onChangeText={setName}
      />

      <Button
        title='Buscar'
        onPress={handleSearch}
      />

      <FriendFlatList
        follow={handleFollow}
        data={friends}
      />

      {/* 
      <FriendScrollList
        data={friends}
        follow={handleFollow}
      /> */}


    </View>
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
  }
});