import React, { FC } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import { fetchData } from '../utils/fetchData';
import { IStackNavigation } from '../navigation/Navigation';

interface ICityCardProps {
  city: string;
}

const CityCard: FC<ICityCardProps> = ({ city }) => {
  const navigation = useNavigation<IStackNavigation>();
  const { data, isLoading, isError } = useQuery(
    ['weatherData', { city }],
    fetchData
  );
  return (
    <>
      {isError && Alert.alert('Sorry, something went wrong')}
      {data?.current && (
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate('Weather', { city })}
        >
          {isLoading && (
            <View style={styles.loading}>
              <ActivityIndicator />
            </View>
          )}
          <View>
            <Text style={styles.cityName}>{city}</Text>
            <View style={styles.weatherInfo}>
              <Image
                source={{ uri: data.current.weather_icons[0] }}
                style={styles.weatherIcon}
              />
              <Text style={styles.temperature}>
                {data.current.temperature}℃
              </Text>
            </View>
          </View>
          <View style={styles.additionalInfo}>
            <Text style={styles.additionalInfoText}>
              {dayjs(data.location.localtime).format('hh:mmA')}
            </Text>
            <Text style={styles.additionalInfoText}>
              {data.current.wind_dir}:{data.current.wind_speed}
            </Text>
            <Text style={styles.additionalInfoText}>
              {data.current.weather_descriptions[0]}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 115,
    borderRadius: 3,
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    marginVertical: 5,
  },
  cityName: {
    fontSize: 22,
    color: '#1c1c1c',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  temperature: {
    fontSize: 25,
    color: '#4f5250',
  },
  additionalInfo: {
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  additionalInfoText: {
    color: '#4f5250',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CityCard;
