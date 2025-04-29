import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { VoiceCommand } from '@/components/VoiceCommand';
import { Mic, Volume2, CircleHelp as HelpCircle } from 'lucide-react-native';

export default function VoiceScreen() {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = async (command: string) => {
    if (Platform.OS !== 'web') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setIsListening(false);
  };

  const startListening = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsListening(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Voice Commands</Text>
        <TouchableOpacity style={styles.helpButton}>
          <HelpCircle size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1590935217281-8f102120d683?w=800&auto=format&fit=crop' }}
          style={styles.backgroundImage}
        />
        
        <View style={styles.overlay}>
          <VoiceCommand onCommand={handleVoiceCommand} />

          <TouchableOpacity
            style={[styles.micButton, isListening && styles.micButtonActive]}
            onPress={startListening}
            accessibilityLabel="Start voice command"
            accessibilityHint="Double tap to start voice recognition">
            <Mic size={32} color="#fff" />
          </TouchableOpacity>

          {isListening && (
            <Text style={styles.listeningText}>Listening...</Text>
          )}
        </View>
      </View>

      <View style={styles.instructionsContainer}>
        <View style={styles.instructionCard}>
          <Volume2 size={24} color="#007AFF" />
          <View style={styles.instructionContent}>
            <Text style={styles.instructionTitle}>Available Commands</Text>
            <Text style={styles.instruction}>• "Add [item] to cart"</Text>
            <Text style={styles.instruction}>• "Create new list"</Text>
            <Text style={styles.instruction}>• "Show my lists"</Text>
          </View>
        </View>

        <View style={styles.tipCards}>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Speak Clearly</Text>
            <Text style={styles.tipText}>Use a clear voice and speak at a normal pace</Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Be Specific</Text>
            <Text style={styles.tipText}>Mention item names and quantities clearly</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1a1a1a',
  },
  helpButton: {
    padding: 8,
  },
  mainContent: {
    height: 300,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  micButtonActive: {
    backgroundColor: '#FF3B30',
    transform: [{ scale: 1.1 }],
  },
  listeningText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#fff',
    marginTop: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  instructionsContainer: {
    padding: 20,
  },
  instructionCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  instructionContent: {
    marginLeft: 16,
    flex: 1,
  },
  instructionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 12,
    color: '#1a1a1a',
  },
  instruction: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  tipCards: {
    flexDirection: 'row',
    gap: 12,
  },
  tipCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tipTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#1a1a1a',
  },
  tipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});