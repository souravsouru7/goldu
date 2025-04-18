const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
console.log('API Base URL:', BASE_URL); // Log the base URL to help with debugging

export const loginAdmin = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

export const createProduct = async (formData) => {
  const token = localStorage.getItem('adminToken');
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData, // FormData for file upload
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to create product');
  }
};

export const getProducts = async () => {
  console.log('Fetching products from:', `${BASE_URL}/products`);
  try {
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    console.log('Starting fetch request...');
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      signal: controller.signal
    }).catch(error => {
      console.error('Network error when fetching products:', error);
      return { ok: false, error: 'Network connectivity issue' };
    });

    clearTimeout(timeoutId);
    console.log('Fetch completed, response status:', response?.status);

    // If the response object is not a valid response (failed fetch)
    if (!response || !response.ok) {
      console.error('Failed response:', response?.status, response?.statusText);
      return {
        success: false,
        error: response?.statusText || 'Failed to fetch products',
        data: []
      };
    }

    try {
      const data = await response.json();
      console.log('Parsed response data:', data);
      return {
        success: true,
        data: data?.data || [],
        error: null
      };
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      return {
        success: false,
        data: [],
        error: 'Invalid response format'
      };
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request timed out:', error);
      return {
        success: false,
        data: [],
        error: 'Request timed out. Please check if your backend server is running.'
      };
    }
    
    console.error('Error fetching products:', error);
    return {
      success: false,
      data: [],
      error: `Failed to fetch products: ${error.message || 'Unknown error'}`
    };
  }
};

// Mock function to provide test data if backend is not available
export const getMockProducts = () => {
  console.log('Using mock product data');
  return {
    success: true,
    data: [
      {
        _id: '1',
        name: 'Premium Tire XL',
        description: 'High-performance tire for all seasons',
        image: '/tires/tire1.jpg',
        category: 'tyre',
        subcategory: 'all-season'
      },
      {
        _id: '2',
        name: 'Alloy Wheel Sport',
        description: 'Lightweight alloy wheel with premium finish',
        image: '/wheels/wheel1.jpg',
        category: 'wheel',
        subcategory: 'alloy'
      },
      {
        _id: '3',
        name: 'Heavy Duty Battery',
        description: 'Long-lasting battery for commercial vehicles',
        image: '/batteries/battery1.jpg',
        category: 'battery',
        subcategory: 'commercial'
      }
    ],
    error: null
  };
};

export const updateProduct = async (id, formData) => {
  const token = localStorage.getItem('adminToken');
  try {
    // Check if formData is already FormData object or needs conversion
    const isFormDataObject = formData instanceof FormData;
    let requestBody = formData;
    
    // If not FormData, we need to create the right headers
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    
    if (!isFormDataObject) {
      headers['Content-Type'] = 'application/json';
      requestBody = JSON.stringify(formData);
    }
    
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers,
      body: requestBody,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to update product');
  }
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem('adminToken');
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to delete product');
  }
};

export const getProductById = async (id) => {
  try {
    if (!id) {
      return {
        success: false,
        error: 'Product ID is required',
        data: null
      };
    }

    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || 'Failed to fetch product',
        data: null
      };
    }

    const data = await response.json();
    
    if (!data.success) {
      return {
        success: false,
        error: data.error || 'Failed to fetch product',
        data: null
      };
    }

    return {
      success: true,
      data: data.data,
      error: null
    };
  } catch (error) {
    console.error('Error in getProductById:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch product',
      data: null
    };
  }
};

export const submitContactForm = async (formData) => {
  try {
    // Validate mobile number format
    const mobileNumberRegex = /^[+]?[\d]{10,14}$/;
    if (!mobileNumberRegex.test(formData.mobileNumber)) {
      throw new Error('Invalid mobile number format');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Invalid email format');
    }

    // Validate message length
    if (formData.message.length < 10) {
      throw new Error('Message must be at least 10 characters long');
    }

    const response = await fetch(`${BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        message: formData.message.trim()
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to submit form');
    }

    return data;
  } catch (error) {
    console.error('Form submission error:', error);
    throw new Error(error.message || 'Failed to submit form');
  }
};
