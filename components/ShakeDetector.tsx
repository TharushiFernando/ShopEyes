import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Haptics from 'expo-haptics';

interface ShakeDetectorProps {
  onShake: () => void;
  threshold?: number;
}

export function ShakeDetector({ onShake, threshold = 1.5 }: ShakeDetectorProps) {
  useEffect(() => {
    // Early return for web platform
    if (Platform.OS === 'web') {
      return;
    }

    let lastUpdate = 0;
    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const currentTime = Date.now();
      if ((currentTime - lastUpdate) > 100) {
        const diffTime = currentTime - lastUpdate;
        lastUpdate = currentTime;

        const speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;

        if (speed > threshold) {
          if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
          onShake();
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    });

    return () => {
      subscription.remove();
    };
  }, [onShake, threshold]);

  return null;
}