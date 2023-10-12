import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance =  axios.create({
  baseURL: 'https://a665-91-202-108-45.ngrok-free.app',
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
  )

export default instance;
