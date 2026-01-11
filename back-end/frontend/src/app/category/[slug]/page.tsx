'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchCategoryProducts } from '@/lib/api';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const limit = 12;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchCategoryProducts(slug, page, limit)
      .then(res => {
              console.log('CATEGORY API RESPONSE:', res); // 👈 HERE
setData(res);})
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug, page]);

  if (loading) return <p className="p-6">Loading products…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!data || data.products.length === 0)
    return <p className="p-6">No products yet.</p>;

const totalPages = data?.total
  ? Math.ceil(data.total / limit)
  : 1;

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        Category: {slug.replace(/-/g, ' ')}
      </h1>

      <p className="text-gray-500 mb-6">
        Page {page} of {totalPages}
      </p>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.products.map((product: any) => (
  <a
    key={product.id}
    href={`/product/${product.id}`}
    className="block border rounded-lg p-4 hover:shadow-md transition"
  >
    <div className="h-48 bg-gray-100 flex items-center justify-center mb-3">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full object-contain"
        />
      ) : (
        <span className="text-gray-400">No Image</span>
      )}
    </div>

    <h3 className="font-semibold text-sm mb-1">{product.title}</h3>
    <p className="text-green-600 font-bold">£{product.price}</p>

    <span className="text-blue-600 text-sm underline">
      View details →
    </span>
  </a>
))}

      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          ← Previous
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </main>
  );
}
