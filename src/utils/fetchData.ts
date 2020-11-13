import axios from 'axios';
import { IWeatherData } from '../interfaces/weather';

export const fetchData = async (key: string, obj: { city: string }) => {
  const { data } = await axios.get<IWeatherData>(
    `http://api.weatherstack.com/current?access_key=8249666aa789c861e1de6e7c84defd45&query=${obj.city.replace(
      / *\([^)]*\) */g,
      ''
    )}`
  );
  return data;
};
