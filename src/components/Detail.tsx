import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface IDetailProps {
  iconName: string;
  title: string;
  value?: number;
}

const Detail: FC<IDetailProps> = ({ iconName, title, value }) => {
  return (
    <View style={styles.detail}>
      <View style={styles.iconWrapper}>
        <Feather name={iconName} size={25} color="#4f5250" />
      </View>
      <View>
        <Text style={styles.detailTitle}>{title}</Text>
        <Text>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 160,
    marginBottom: 20,
  },
  iconWrapper: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#e4ebe5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  detailTitle: {
    color: 'grey',
    fontSize: 15,
  },
});

export default Detail;
