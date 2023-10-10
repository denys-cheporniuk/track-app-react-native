import { useEffect, useState } from 'react';
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from 'expo-location';

export const useLocation = (shouldTrack, callback) => {
  const [locationError, setLocationError] = useState('');
  const [subscriber, setSubscriber] = useState(null);

  const startWatching = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();

      if (!granted) {
        console.log('error');
        throw new Error('Location permission not granted');
      }

      const sub = await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 500,
        distanceInterval: 10,
      },
        callback,
      );

      setSubscriber(sub);
    } catch (e) {
      setLocationError(e.message);
    }
  };

  useEffect(() => {
    if (shouldTrack) {
      startWatching();
    } else {
      subscriber.remove();
    }
  }, [shouldTrack])


  return [locationError];
}
