import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Plus } from 'lucide-react-native';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  expiryDate: string;
  alternatives: Product[];
}

export default function ProductDetailsScreen() {
  const { barcode } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch product details
    setTimeout(() => {
      setProduct({
        id: '1',
        name: 'Organic Milk',
        price: 3.99,
        description: 'Fresh organic whole milk from grass-fed cows.',
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
        expiryDate: '2024-04-15',
        alternatives: [
          {
            id: '2',
            name: 'Soy Milk',
            price: 3.49,
            description: 'Plant-based alternative to dairy milk.',
            image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
            expiryDate: '2024-04-20',
            alternatives: [],
          },
          {
            id: '3',
            name: 'Almond Milk',
            price: 3.99,
            description: 'Dairy-free milk made from almonds.',
            image: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=400',
            expiryDate: '2024-04-18',
            alternatives: [],
          },
        ],
      });
      setLoading(false);
    }, 1000);
  }, [barcode]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}>
        <ArrowLeft size={24} color="#007AFF" />
      </TouchableOpacity>

      <Image source={{ uri: product.image }} style={styles.productImage} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>
        
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>

        {product.alternatives.length > 0 && (
          <View style={styles.alternativesSection}>
            <Text style={styles.alternativesTitle}>Similar Products</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {product.alternatives.map((alt) => (
                <TouchableOpacity
                  key={alt.id}
                  style={styles.alternativeItem}
                  onPress={() => setProduct(alt)}>
                  <Image source={{ uri: alt.image }} style={styles.alternativeImage} />
                  <Text style={styles.alternativeName}>{alt.name}</Text>
                  <Text style={styles.alternativePrice}>${alt.price.toFixed(2)}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  alternativesSection: {
    marginTop: 24,
  },
  alternativesTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  alternativeItem: {
    width: 160,
    marginRight: 16,
  },
  alternativeImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 8,
  },
  alternativeName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  alternativePrice: {
    fontSize: 14,
    color: '#007AFF',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 100,
  },
});