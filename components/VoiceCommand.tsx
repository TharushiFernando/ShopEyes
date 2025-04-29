import { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';

interface VoiceCommandProps {
  onCommand: (command: string) => void;
}

export function VoiceCommand({ onCommand }: VoiceCommandProps) {
  const [isListening, setIsListening] = useState(false);

  const startListening = async () => {
    try {
      setIsListening(true);
      if (Platform.OS !== 'web') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      
      // Note: This is a mock implementation since expo-speech doesn't support voice recognition
      // In a real app, you would use a proper voice recognition library
      setTimeout(() => {
        setIsListening(false);
        onCommand('add milk');
      }, 2000);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      setIsListening(false);
    }
  };

  useEffect(() => {
    return () => {
      setIsListening(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Voice command UI components would go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});