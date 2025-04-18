'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProductModal = ({ product, isOpen, onClose }) => {
  const router = useRouter();

  const handleEnquire = () => {
    onClose();
    router.push('/ConductUs');
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <h3 className="text-2xl font-semibold leading-6 text-gray-900 mb-4">
            {product.name}
          </h3>

          <div className="mt-2">
            {/* Product Image */}
            <div className="aspect-square w-full mb-4 bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400">No Image Available</div>';
                }}
              />
            </div>

            {/* Product Details */}
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 rounded-full text-sm">
                {product.subcategory}
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-medium text-white hover:from-amber-600 hover:to-orange-600"
              onClick={handleEnquire}
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;