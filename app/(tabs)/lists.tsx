import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, TextInput, Modal, Image } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ShakeDetector } from '@/components/ShakeDetector';
import { Plus, Star, X, ChevronRight, Search } from 'lucide-react-native';

interface ShoppingList {
  id: string;
  name: string;
  items: string[];
  image?: string;
}

export default function ListsScreen() {
  const [lists, setLists] = useState<ShoppingList[]>([
    {
      id: '1',
      name: 'Weekly Groceries',
      items: ['Milk', 'Bread', 'Eggs', 'Fruits'],
      image: 'https://images.unsplash.com/photo-1543168256-418811576931?w=800&auto=format&fit=crop'
    },
    {
      id: '2',
      name: 'Household Items',
      items: ['Paper Towels', 'Soap', 'Detergent'],
      image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&auto=format&fit=crop'
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListItems, setNewListItems] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleShake = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleListPress = async (list: ShoppingList) => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleAddList = () => {
    if (newListName.trim() === '') return;

    const newList: ShoppingList = {
      id: Date.now().toString(),
      name: newListName.trim(),
      items: newListItems.split(',').map(item => item.trim()).filter(item => item !== ''),
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop'
    };

    setLists(prevLists => [...prevLists, newList]);
    setNewListName('');
    setNewListItems('');
    setIsModalVisible(false);

    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const filteredLists = lists.filter(list =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    list.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <ShakeDetector onShake={handleShake} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Lists</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Star size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search lists..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>
      </View>
      
      <FlatList
        data={filteredLists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleListPress(item)}
            accessibilityLabel={`${item.name} shopping list`}
            accessibilityHint={`Double tap to view ${item.name} list containing ${item.items.length} items`}>
            <Image
              source={{ uri: item.image }}
              style={styles.listImage}
            />
            <View style={styles.listContent}>
              <View style={styles.listHeader}>
                <Text style={styles.listName}>{item.name}</Text>
                <Text style={styles.itemCount}>{item.items.length} items</Text>
              </View>
              <Text style={styles.listPreview}>{item.items.join(', ')}</Text>
              <ChevronRight size={20} color="#666" style={styles.chevron} />
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New List</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.closeButton}>
                <X size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="List Name"
              value={newListName}
              onChangeText={setNewListName}
              placeholderTextColor="#666"
            />

            <TextInput
              style={[styles.input, styles.itemsInput]}
              placeholder="Items (comma-separated)"
              value={newListItems}
              onChangeText={setNewListItems}
              multiline
              placeholderTextColor="#666"
            />

            <TouchableOpacity
              style={[styles.button, !newListName.trim() && styles.buttonDisabled]}
              onPress={handleAddList}
              disabled={!newListName.trim()}>
              <Text style={styles.buttonText}>Create List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setIsModalVisible(true);
          if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }
        }}
        accessibilityLabel="Create new list"
        accessibilityHint="Double tap to create a new shopping list">
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
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
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    padding: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  listImage: {
    width: 100,
    height: '100%',
  },
  listContent: {
    flex: 1,
    padding: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  listName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1a1a1a',
  },
  itemCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  listPreview: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginRight: 24,
  },
  chevron: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -10,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  closeButton: {
    padding: 4,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  itemsInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
    fontSize: 16,
  },
});