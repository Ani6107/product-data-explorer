'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProductById } from '@/lib/api';

export default function ProductPage() {
  const params = useParams();
  const id = Number(params.id);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchProductById(id)
      .then(setProduct)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading product…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

      <div className="flex gap-6">
        <div className="w-64 h-80 bg-gray-100 flex items-center justify-center">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="object-contain h-full"
            />
          ) : (
            <span className="text-gray-400">No image</span>
          )}
        </div>

        <div>
          <p className="text-2xl text-green-600 font-bold mb-2">
            £{product.price}
          </p>

          {product.detail?.description && (
            <p className="text-gray-700 mb-4">
              {product.detail.description}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
