import { useEffect, useState } from 'react';
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from 'expo-location';

export const useLocation = (callback) => {
  const [locationError, setLocationError] = useState('');

  const startWatching = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();

      if (!granted) {
        console.log('error');
        throw new Error('Location permission not granted');
      }

      await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 500,
        distanceInterval: 10,
      },
        callback,
      );
    } catch (e) {
      setLocationError(e.message);
    }
  };

  useEffect(() => {
    startWatching();
  }, [])

  return [locationError];
}
