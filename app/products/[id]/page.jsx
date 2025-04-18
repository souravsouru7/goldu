import { getProducts, getProductById } from '../../../src/utils/api';
import ProductDetailClient from './ProductDetailClient';

// This function runs at build time to generate all possible product pages
export async function generateStaticParams() {
  try {
    const response = await getProducts();
    if (response.success) {
      return response.data.map((product) => ({
        id: product._id,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// This function runs at build time to pre-render each product page
export async function generateMetadata({ params }) {
  try {
    const response = await getProductById(params.id);
    if (response.success) {
      return {
        title: response.data.name,
        description: response.data.description,
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  return {
    title: 'Product Details',
    description: 'View product details',
  };
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
} 