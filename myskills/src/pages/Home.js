import React from 'react';
import {
  FlatList, ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Platform,
  Layout, StatusBar
} from 'react-native';
import { useState, useEffect } from 'react';
import { SkillCard } from '../components/SkillCard';
import { Button } from '../components/Button';

export function Home() {
  const [totalSkills, setTotalSkills] = useState(0);
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState([]);
  const [greeting, setGreeting] = useState('');

  function handleAddNewSkill() {
    setMySkills(oldState => [...oldState, newSkill]);
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morgning');
    } else if (currentHour >= 12 && currentHour <= 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Night');
    }

  }, []);


  useEffect(() => {
    setTotalSkills(oldState => mySkills.length);
  }, [mySkills]);
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />

      <Text style={styles.text}>Welcome, Emmerson</Text>

      <Text style={[styles.greetings]}>
        {greeting}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill} />

      <View style={{
        marginTop: 30, marginBottom: 30,
        flexDirection: "row", justifyContent: 'space-between',
        position: 'relative', alignItems: 'center'
      }}>
        <Text style={[styles.text]}>
          My Skills
        </Text>
        <Text style={[styles.text]}>
          Total: {totalSkills}
        </Text>
      </View>

      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ flexDirection: "column" }}
        data={mySkills}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => (
          <SkillCard skill={item} />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121015",
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
  input: {
    backgroundColor: "#1F1E25",
    color: "#FFF",
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  greetings: {
    fontSize: 20,
    color: "#bdbbbb", fontWeight: "300"
  }

});