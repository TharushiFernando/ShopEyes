import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ShoppingBag, Volume2, Camera, MapPin, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Speech from 'expo-speech';

const QUICK_ACTIONS = [
  {
    id: 'shopping-list',
    title: 'Shopping List',
    description: 'Manage your shopping items',
    icon: ShoppingBag,
    color: '#ffff',
  },
  {
    id: 'scan-item',
    title: 'Scan Item',
    description: 'Identify products with camera',
    icon: Camera,
    color: '#34C759',
  },
  {
    id: 'nearby-stores',
    title: 'Nearby Stores',
    description: 'Find accessible stores near you',
    icon: MapPin,
    color: '#FF9500',
  },
  {
    id: 'recent-items',
    title: 'Recent Items',
    description: 'View your shopping history',
    icon: Clock,
    color: '#AF52DE',
  },
];

const FEATURED_ITEMS = [
  {
    id: '1',
    name: 'Fresh Produce',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c',
    description: 'Fresh fruits and vegetables',
  },
  {
    id: '2',
    name: 'Dairy Products',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da',
    description: 'Milk, cheese, and yogurt',
  },
  {
    id: '3',
    name: 'Bakery Items',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    description: 'Fresh bread and pastries',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const readWelcome = () => {
    Speech.speak(
      'Welcome to VisionCart, your accessible shopping companion. Tap anywhere on the screen to explore our features.',
      { rate: 0.9 }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>Welcome to VisionCart</Text>
          <TouchableOpacity onPress={readWelcome} style={styles.speakerButton}>
            <Volume2 size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Your accessible shopping companion</Text>
      </View>

      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={() => router.push(`/${action.id}`)}
                accessibilityLabel={action.title}
                accessibilityHint={action.description}>
                <View style={[styles.iconContainer, { backgroundColor: `${action.color}15` }]}>
                  <Icon size={24} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.featuredContainer}>
        <Text style={styles.sectionTitle}>Featured Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredScroll}>
          {FEATURED_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.featuredCard}
              accessibilityLabel={`${item.name}: ${item.description}`}>
              <Image
                source={{ uri: item.image }}
                style={styles.featuredImage}
                accessibilityLabel={`Image of ${item.name}`}
              />
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>{item.name}</Text>
                <Text style={styles.featuredDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.helpContainer}>
        <Text style={styles.helpTitle}>Need Assistance?</Text>
        <Text style={styles.helpText}>
          Double tap anywhere on the screen to have VisionCart read the content aloud.
          We're here to make your shopping experience easier and more accessible.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#000000',
  },
  speakerButton: {
    padding: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#636366',
    marginBottom: 8,
  },
  quickActionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  actionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#636366',
  },
  featuredContainer: {
    padding: 20,
  },
  featuredScroll: {
    paddingRight: 20,
  },
  featuredCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 160,
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 4,
  },
  featuredDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#636366',
  },
  helpContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#007AFF10',
    borderRadius: 16,
  },
  helpTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 8,
  },
  helpText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#636366',
    lineHeight: 20,
  },
});