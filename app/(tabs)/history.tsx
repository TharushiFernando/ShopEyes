import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { Check, X } from 'lucide-react-native';

interface HistoryItem {
  id: string;
  name: string;
  image: string;
  date: string;
  purchased: boolean;
}

const historyData: HistoryItem[] = [
  {
    id: '1',
    name: 'Organic Milk',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
    date: '2024-02-01',
    purchased: true,
  },
  {
    id: '2',
    name: 'Whole Grain Bread',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    date: '2024-02-01',
    purchased: false,
  },
];

export default function HistoryScreen() {
  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.historyItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={[
        styles.status,
        item.purchased ? styles.purchasedStatus : styles.skippedStatus
      ]}>
        {item.purchased ? (
          <Check size={16} color="#34C759" />
        ) : (
          <X size={16} color="#FF3B30" />
        )}
        <Text style={[
          styles.statusText,
          item.purchased ? styles.purchasedText : styles.skippedText
        ]}>
          {item.purchased ? 'Purchased' : 'Skipped'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan History</Text>
      <FlatList
        data={historyData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  list: {
    padding: 20,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  purchasedStatus: {
    backgroundColor: '#E4F9E5',
  },
  skippedStatus: {
    backgroundColor: '#FFE5E5',
  },
  statusText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  purchasedText: {
    color: '#34C759',
  },
  skippedText: {
    color: '#FF3B30',
  },
});