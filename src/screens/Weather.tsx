import React, { useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from 'react-query';
import Constant from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import TextTicker from 'react-native-text-ticker';
import { fetchData } from '../utils/fetchData';
import Detail from '../components/Detail';
import { mainColorPairs } from '../utils/consts';
import { IStackNavigation, StackParamList } from '../navigation/Navigation';

const Weather = () => {
  const navigation = useNavigation<IStackNavigation>();
  const route = useRoute<RouteProp<StackParamList, 'Weather'>>();

  const city = route.params !== undefined ? route.params.city : '';

  const [currentCity, setCurrentCity] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status === 'granted') {
        try {
          const location = await Location.getCurrentPositionAsync({});
          const {
            coords: { latitude, longitude },
          } = location;
          const geoCode = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });
          setCurrentCity(geoCode[0].city);
        } catch (err) {
          Alert.alert("Can't get current location");
        }
      }
    })();
  });
  const { data, isLoading, isError } = useQuery(
    ['data', { city: city || currentCity || 'melbourne' }],
    fetchData
  );
  const { hot, moderate, cold } = mainColorPairs;
  return (
    <>
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      )}
      {isError && Alert.alert('Sorry, something went wrong')}
      {data?.current && (
        <>
          <View style={styles.linearGradientWrapper}>
            <LinearGradient
              colors={
                data?.current.temperature && data?.current.temperature > 30
                  ? hot
                  : data?.current.temperature && data?.current.temperature > 15
                  ? moderate
                  : cold
              }
              style={styles.linearGradient}
              testID="linearGradient"
            />
          </View>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.city}>{data?.location.name}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SelectCity', { currentCity })
                }
              >
                <Ionicons
                  name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
                  size={40}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.locationInfo}>
              {data?.location.region} | {data?.location.country}
            </Text>
            <View style={styles.weatherInfo}>
              <Image
                source={{ uri: data?.current.weather_icons[0] }}
                style={styles.weatherIcon}
              />
              <View style={styles.weatherDescContainer}>
                <TextTicker
                  style={styles.weatherDesc}
                  bounce
                  loop
                  marqueeDelay={1000}
                  scrollSpeed={200}
                >
                  {data?.current.weather_descriptions[0]}
                </TextTicker>
              </View>

              <Text style={styles.temperature}>
                {data?.current.temperature}℃
              </Text>
              <Text style={styles.windInfo}>
                {data?.current.wind_dir}:{data?.current.wind_speed}{' '}
                &nbsp;|&nbsp; Visibility:
                {data?.current.visibility}
              </Text>
            </View>
            <View style={styles.details}>
              <Detail
                iconName="droplet"
                title="Humidity"
                value={data?.current.humidity}
              />
              <Detail
                iconName="sun"
                title="UV Index"
                value={data?.current.uv_index}
              />
              <Detail
                iconName="cloud"
                title="Cloud Over"
                value={data?.current.cloudcover}
              />
              <Detail
                iconName="wind"
                title="Wind Degree"
                value={data?.current.wind_degree}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  linearGradientWrapper: {
    flex: 1,
    position: 'absolute',
    height: 450,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomRightRadius: 50,
    overflow: 'hidden',
  },
  linearGradient: {
    width: '100%',
    height: '100%',
  },
  container: {
    marginTop: Constant.statusBarHeight,
    marginHorizontal: '5%',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  city: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  locationInfo: {
    color: '#fff',
  },
  weatherInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  weatherIcon: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: 5,
  },
  weatherDescContainer: {
    width: '60%',
    alignItems: 'center',
  },
  weatherDesc: {
    color: '#fff',
    fontSize: 18,
  },
  temperature: {
    fontSize: 60,
    color: '#fff',
  },
  windInfo: {
    color: '#fff',
  },
  details: {
    marginTop: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Weather;
