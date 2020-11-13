import React, { FC, useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Constant from 'expo-constants';
import { Feather, Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { IStackNavigation, StackParamList } from '../navigation/Navigation';
import CityCard from '../components/CityCard';

const DismissKeyboard: FC = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const SelectCity: FC = () => {
  const navigation = useNavigation<IStackNavigation>();
  const route = useRoute<RouteProp<StackParamList, 'SelectCity'>>();
  const { currentCity } = route.params;
  const [city, setCity] = useState('');
  const majorCitiesList = [
    `${currentCity}(Current)`,
    'Beijing',
    'Shanghai',
    'Hong Kong',
    'Sydney',
    'Melbourne',
    'Los Angeles',
    'New York',
    'London',
    'Paris',
    'Madrid',
    'Dubai',
    'Singapore',
    'Bangkok',
  ];
  return (
    <View style={styles.container}>
      <DismissKeyboard>
        <>
          <Feather
            name="search"
            size={26}
            style={styles.searchIcon}
            color="#b1b7bd"
          />
          <TouchableOpacity style={styles.cross} onPress={() => setCity('')}>
            <Entypo
              name="circle-with-cross"
              size={22}
              color="#b1b7bd"
              style={{ opacity: city ? 0.8 : 0 }}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.searchBar}
            value={city}
            onChangeText={(text) => setCity(text)}
            onSubmitEditing={() => {
              if (city) {
                navigation.navigate('Weather', { city });
                setCity('');
              }
            }}
          />
          <View style={styles.cityCards}>
            <FlatList
              data={majorCitiesList}
              renderItem={({ item }) => <CityCard city={item} />}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      </DismissKeyboard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constant.statusBarHeight,
    marginHorizontal: '5%',
  },
  searchBar: {
    marginTop: 20,
    width: '100%',
    height: 46,
    borderRadius: 30,
    paddingLeft: 50,
    paddingRight: 20,
    backgroundColor: '#e6ebf0',
    zIndex: 0,
  },
  searchIcon: {
    position: 'absolute',
    marginTop: 30,
    left: 10,
    zIndex: 1,
  },
  cross: {
    position: 'absolute',
    marginTop: 32,
    zIndex: 1,
    right: 10,
  },
  cityCards: {
    marginTop: 20,
  },
});

export default SelectCity;
