import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps
} from 'react-native';

interface ISkillCardProps extends TouchableOpacityProps {
  skill: string;
}


export function SkillCard({ skill, ...rest }: ISkillCardProps) {
  return (
    <TouchableOpacity
      style={styles.buttonSkill}
      activeOpacity={.7}
      {...rest}
    >
      <Text style={styles.textSkill}>
        {skill}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonSkill: {
    backgroundColor: '#1f1e25',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 10
  },
  textSkill: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold'
  }
});