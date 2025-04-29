import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image, Dimensions } from 'react-native';
import { Plus, Trash2, Volume2, Search, Camera, Filter } from 'lucide-react-native';
import * as Speech from 'expo-speech';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  available: boolean;
  image: string;
  price: number;
  category: string;
  unit?: string;
  nutritionInfo?: string;
}

const CATEGORIES = [
  'Fruits & Vegetables',
  'Dairy & Eggs',
  'Meat & Fish',
  'Bakery',
  'Beverages',
  'Pantry',
  'Snacks',
  'Household',
];

const DEFAULT_ITEMS: ShoppingItem[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    quantity: 6,
    available: true,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
    price: 3.99,
    category: 'Fruits & Vegetables',
    unit: 'bunch',
    nutritionInfo: 'Rich in potassium and fiber',
  },
  {
    id: '2',
    name: 'Fresh Avocados',
    quantity: 4,
    available: true,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578',
    price: 5.99,
    category: 'Fruits & Vegetables',
    unit: 'pieces',
    nutritionInfo: 'High in healthy fats',
  },
  {
    id: '3',
    name: 'Organic Milk',
    quantity: 2,
    available: true,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
    price: 4.49,
    category: 'Dairy & Eggs',
    unit: 'gallon',
    nutritionInfo: 'Calcium-rich',
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    quantity: 3,
    available: true,
    image: 'https://images.unsplash.com/photo-1584278773680-8d5c4e7523d6',
    price: 1.99,
    category: 'Dairy & Eggs',
    unit: 'cups',
    nutritionInfo: 'High in protein',
  },
  {
    id: '5',
    name: 'Fresh Salmon',
    quantity: 1,
    available: true,
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6',
    price: 12.99,
    category: 'Meat & Fish',
    unit: 'lb',
    nutritionInfo: 'Rich in omega-3',
  },
  {
    id: '6',
    name: 'Whole Grain Bread',
    quantity: 1,
    available: true,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    price: 3.99,
    category: 'Bakery',
    unit: 'loaf',
    nutritionInfo: 'High in fiber',
  },
  {
    id: '7',
    name: 'Cold Brew Coffee',
    quantity: 2,
    available: true,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5',
    price: 4.99,
    category: 'Beverages',
    unit: 'bottles',
  },
  {
    id: '8',
    name: 'Quinoa',
    quantity: 1,
    available: true,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c',
    price: 6.99,
    category: 'Pantry',
    unit: 'lb',
    nutritionInfo: 'Complete protein source',
  },
  {
    id: '9',
    name: 'Mixed Nuts',
    quantity: 2,
    available: true,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32',
    price: 8.99,
    category: 'Snacks',
    unit: 'bags',
    nutritionInfo: 'Heart-healthy fats',
  },
  {
    id: '10',
    name: 'Paper Towels',
    quantity: 1,
    available: true,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f',
    price: 5.99,
    category: 'Household',
    unit: 'pack',
  },
];

export default function ShoppingListScreen() {
  const [items, setItems] = useState<ShoppingItem[]>(DEFAULT_ITEMS);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('1');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addItem = useCallback(() => {
    if (!newItemName.trim()) {
      Alert.alert('Error', 'Please enter an item name');
      return;
    }

    const quantity = parseInt(newItemQuantity, 10) || 1;
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      quantity,
      available: Math.random() > 0.3,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
      price: parseFloat((Math.random() * 10 + 1).toFixed(2)),
      category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
    };

    setItems(current => [...current, newItem]);
    setNewItemName('');
    setNewItemQuantity('1');
  }, [newItemName, newItemQuantity]);

  const removeItem = useCallback((id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  }, []);

  const readList = useCallback(() => {
    if (items.length === 0) {
      Speech.speak('Your shopping list is empty');
      return;
    }

    const listText = items
      .map(item => `${item.quantity} ${item.unit || ''} ${item.name}, ${item.available ? 'available' : 'not available'}, ${item.price.toFixed(2)} dollars`)
      .join('. ');
    
    Speech.speak(`Your shopping list contains: ${listText}`);
  }, [items]);

  const totalCost = filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping List</Text>
        <TouchableOpacity
          onPress={readList}
          style={styles.readButton}
          accessibilityLabel="Read shopping list"
          accessibilityHint="Reads out all items in your shopping list">
          <Volume2 size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search items..."
            accessibilityLabel="Search items"
          />
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            style={styles.filterButton}
            accessibilityLabel="Toggle filters">
            <Filter size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </View>

      {showFilters && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}>
          <TouchableOpacity
            style={[styles.categoryChip, !selectedCategory && styles.categoryChipSelected]}
            onPress={() => setSelectedCategory(null)}>
            <Text style={[styles.categoryText, !selectedCategory && styles.categoryTextSelected]}>
              All
            </Text>
          </TouchableOpacity>
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryChip, selectedCategory === category && styles.categoryChipSelected]}
              onPress={() => setSelectedCategory(category === selectedCategory ? null : category)}>
              <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextSelected]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={newItemName}
            onChangeText={setNewItemName}
            placeholder="Enter item name"
            accessibilityLabel="Item name input"
            accessibilityHint="Enter the name of the item you want to add"
          />
          <TextInput
            style={styles.quantityInput}
            value={newItemQuantity}
            onChangeText={setNewItemQuantity}
            keyboardType="numeric"
            placeholder="Qty"
            accessibilityLabel="Quantity input"
            accessibilityHint="Enter the quantity of the item"
          />
        </View>
        <View style={styles.inputActions}>
          <TouchableOpacity
            style={styles.cameraButton}
            accessibilityLabel="Take photo"
            accessibilityHint="Take a photo of the item">
            <Camera size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={addItem}
            style={styles.addButton}
            accessibilityLabel="Add item"
            accessibilityHint="Adds the item to your shopping list">
            <Plus size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.list}>
        {CATEGORIES.map(category => {
          const categoryItems = filteredItems.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {categoryItems.map(item => (
                <View key={item.id} style={styles.item}>
                  <Image
                    source={{ uri: `${item.image}?w=200&h=200&fit=crop` }}
                    style={styles.itemImage}
                    accessibilityLabel={`Image of ${item.name}`}
                  />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemQuantity}>
                      Qty: {item.quantity} {item.unit}
                    </Text>
                    <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                    {item.nutritionInfo && (
                      <Text style={styles.nutritionInfo}>{item.nutritionInfo}</Text>
                    )}
                    <Text style={[styles.availability, item.available ? styles.available : styles.unavailable]}>
                      {item.available ? 'Available' : 'Not Available'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                    style={styles.deleteButton}
                    accessibilityLabel={`Delete ${item.name}`}
                    accessibilityHint={`Removes ${item.name} from your shopping list`}>
                    <Trash2 size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${totalCost.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#000000',
  },
  readButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  filterButton: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontFamily: 'Inter-Regular',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  categoryChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#000000',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  inputContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    fontFamily: 'Inter-Regular',
  },
  quantityInput: {
    width: 60,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cameraButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  itemQuantity: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#636366',
    marginBottom: 2,
  },
  itemPrice: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 2,
  },
  nutritionInfo: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#34C759',
    marginBottom: 2,
  },
  availability: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  available: {
    color: '#34C759',
  },
  unavailable: {
    color: '#FF3B30',
  },
  deleteButton: {
    padding: 8,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  totalText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#000000',
    textAlign: 'right',
  },
});