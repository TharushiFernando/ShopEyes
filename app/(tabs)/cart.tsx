import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { Trash2, CircleAlert as AlertCircle, ShoppingBag, Clock } from 'lucide-react-native';
import { isAfter, parseISO, format } from 'date-fns';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  expiryDate: string;
  quantity: number;
}

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<Product[]>([
    {
      id: '1',
      name: 'Organic Milk',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
      expiryDate: '2024-04-15',
      quantity: 2,
    },
    {
      id: '2',
      name: 'Whole Grain Bread',
      price: 2.49,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      expiryDate: '2024-02-10',
      quantity: 1,
    },
    {
      id: '3',
      name: 'Fresh Eggs',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400',
      expiryDate: '2024-04-20',
      quantity: 1,
    },
    {
      id: '4',
      name: 'Greek Yogurt',
      price: 1.99,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
      expiryDate: '2024-02-05',
      quantity: 3,
    },
  ]);

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const isExpired = (date: string) => {
    return isAfter(new Date(), parseISO(date));
  };

  const getExpiryStatus = (date: string) => {
    const expiryDate = parseISO(date);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) {
      return { status: 'expired', color: '#FF3B30' };
    } else if (daysUntilExpiry <= 3) {
      return { status: 'expiring soon', color: '#FF9500' };
    }
    return { status: 'fresh', color: '#34C759' };
  };

  const validItems = cartItems.filter(item => !isExpired(item.expiryDate));
  const expiredItems = cartItems.filter(item => isExpired(item.expiryDate));

  const calculateTotal = (items: Product[]) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const renderItem = ({ item }: { item: Product }) => {
    const expiryStatus = getExpiryStatus(item.expiryDate);

    return (
      <View style={[
        styles.cartItem,
        expiryStatus.status === 'expired' && styles.expiredItem
      ]}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
          <View style={[styles.expiryBadge, { backgroundColor: `${expiryStatus.color}15` }]}>
            <Clock size={14} color={expiryStatus.color} />
            <Text style={[styles.expiryText, { color: expiryStatus.color }]}>
              {expiryStatus.status === 'fresh' 
                ? `Expires ${format(parseISO(item.expiryDate), 'MMM d, yyyy')}`
                : expiryStatus.status === 'expiring soon'
                ? 'Expiring Soon'
                : 'Expired'}
            </Text>
          </View>
        </View>
        <View style={styles.actions}>
          {!isExpired(item.expiryDate) && (
            <View style={styles.quantity}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, -1)}>
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, 1)}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeItem(item.id)}>
            <Trash2 size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ListHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <ShoppingBag size={24} color="#007AFF" />
        <Text style={styles.headerTitle}>Shopping Cart</Text>
      </View>
      <Text style={styles.itemCount}>
        {validItems.length} {validItems.length === 1 ? 'item' : 'items'}
      </Text>
    </View>
  );

  const ListFooter = () => (
    <>
      {expiredItems.length > 0 && (
        <View style={styles.expiredSection}>
          <View style={styles.expiredHeader}>
            <AlertCircle size={20} color="#FF3B30" />
            <Text style={styles.expiredTitle}>Expired Items</Text>
          </View>
          {expiredItems.map(item => renderItem({ item }))}
        </View>
      )}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${calculateTotal(validItems).toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={[
            styles.checkoutButton,
            validItems.length === 0 && styles.checkoutButtonDisabled
          ]}
          disabled={validItems.length === 0}>
          <Text style={styles.checkoutButtonText}>
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <ListHeader />
        <View style={styles.emptyState}>
          <ShoppingBag size={48} color="#999" />
          <Text style={styles.emptyStateText}>Your cart is empty</Text>
          <Text style={styles.emptyStateSubtext}>
            Start scanning products to add them to your cart
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={validItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: Platform.OS === 'web' ? 20 : 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  itemCount: {
    fontSize: 16,
    color: '#666',
  },
  list: {
    paddingBottom: 40,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
    }),
  },
  expiredItem: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FFE5E5',
    borderWidth: 1,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  productInfo: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  actions: {
    alignItems: 'flex-end',
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
    marginBottom: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  expiryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  expiryText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  expiredSection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  expiredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  expiredTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 8,
  },
  summary: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    marginTop: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonDisabled: {
    backgroundColor: '#ccc',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 40,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});