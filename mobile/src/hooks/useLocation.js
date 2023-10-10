import { useEffect, useState } from 'react';
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from 'expo-location';

export const useLocation = (shouldTrack, callback) => {
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    let subscriber;

    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();

        if (!granted) {
          console.log('error');
          throw new Error('Location permission not granted');
        }

        subscriber = await watchPositionAsync({
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

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }

      subscriber = null;
    }

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback])


  return [locationError];
}
