'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchNavigation } from '@/lib/api';

type NavigationItem = {
  id: number;
  title: string;
  slug: string;
};

export default function HomePage() {
  const [data, setData] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNavigation()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
          Product Data Explorer
      </h1>

      {loading && (
        <p className="text-gray-500">Loading navigation...</p>
      )}

      {error && (
        <p className="text-red-500">Error: {error}</p>
      )}

      {!loading && !error && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map(item => (
            <li
  key={item.id}
  className="border rounded-lg p-4 hover:shadow-md transition"
>
  <Link
    href={`/category/${item.slug.replace('/collections/', '')}`}
    className="block"
  >
    <h2 className="font-semibold">{item.title}</h2>
    <p className="text-sm text-gray-500">{item.slug}</p>
  </Link>
</li>
          ))}
        </ul>
      )}
    </main>
  );
}
