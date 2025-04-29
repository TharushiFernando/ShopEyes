import { View, Text, StyleSheet, Switch } from 'react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const [autoRead, setAutoRead] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Auto-read new items</Text>
          <Switch
            value={autoRead}
            onValueChange={setAutoRead}
            accessibilityLabel="Auto-read new items"
            accessibilityHint="When enabled, new items will be automatically read aloud when added to the list"
          />
        </View>

        <View style={styles.setting}>
          <Text style={styles.settingText}>High contrast mode</Text>
          <Switch
            value={highContrast}
            onValueChange={setHighContrast}
            accessibilityLabel="High contrast mode"
            accessibilityHint="When enabled, increases contrast for better visibility"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#000000',
    marginBottom: 32,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
  },
});