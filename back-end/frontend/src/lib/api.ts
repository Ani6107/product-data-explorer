export async function fetchNavigation() {
  const res = await fetch('http://localhost:8080/navigation', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch navigation');
  }

  return res.json();
}

export async function fetchCategoryProducts(
  slug: string,
  page = 1,
  limit = 20,
) {
  const res = await fetch(
    `http://localhost:8080/navigation/${slug}/products?page=${page}&limit=${limit}`,
    { cache: 'no-store' },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch category products');
  }

  return res.json();
}

export async function fetchProductById(id: number) {
  const res = await fetch(`http://localhost:8080/products/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
}

