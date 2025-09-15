import React from 'react';
import { useCompareStore } from '../store/useStore';
import { useProductsQuery } from '../hooks/useProducts';
import { Link } from 'react-router-dom';

export const Compare: React.FC = () => {
  const items = useCompareStore((s) => s.items);
  const remove = useCompareStore((s) => s.remove);
  const clear = useCompareStore((s) => s.clear);

  const { data: allProducts } = useProductsQuery('all');
  const products = (allProducts ?? [])
    .filter((p) => items.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Compare Products</h1>
        {items.length > 0 && (
          <button onClick={clear} className="text-sm text-red-600 hover:underline">Clear All</button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 mb-4">Your compare list is empty. You can add up to 3 products to compare.</p>
          <Link to="/" className="text-sky-600 hover:underline">Go back to shopping</Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-sm font-medium text-gray-500 px-4 py-2">Feature</th>
                {products.map((p: any) => (
                  <th key={p.id} className="px-4 py-2">
                    <div className="w-56">
                      <img src={p.images[0]} alt={p.name} className="w-full h-32 object-cover rounded" />
                      <div className="mt-2 flex items-start justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-900 line-clamp-2">{p.name}</div>
                          <div className="text-xs text-gray-500">{p.brand}</div>
                        </div>
                        <button onClick={() => remove(p.id)} className="text-xs text-gray-500 hover:text-red-600">Remove</button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="align-top">
              <tr className="border-t">
                <td className="text-sm text-gray-600 px-4 py-3">Price</td>
                {products.map((p: any) => (
                  <td key={p.id} className="px-4 py-3 font-semibold text-gray-900">₹{p.price.toFixed(2)}</td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="text-sm text-gray-600 px-4 py-3">Rating</td>
                {products.map((p: any) => (
                  <td key={p.id} className="px-4 py-3 text-gray-900">{p.rating} ({p.reviewCount})</td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="text-sm text-gray-600 px-4 py-3">In Stock</td>
                {products.map((p: any) => (
                  <td key={p.id} className="px-4 py-3">{p.inStock ? 'Yes' : 'No'}</td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="text-sm text-gray-600 px-4 py-3">Key Features</td>
                {products.map((p: any) => (
                  <td key={p.id} className="px-4 py-3 text-sm text-gray-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {(p.features || []).slice(0, 5).map((f: string, i: number) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="text-sm text-gray-600 px-4 py-3">Specifications</td>
                {products.map((p: any) => (
                  <td key={p.id} className="px-4 py-3 text-sm text-gray-700">
                    <div className="space-y-1">
                      {Object.entries(p.specifications || {}).slice(0, 6).map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-3">
                          <span className="text-gray-500">{k}</span>
                          <span className="text-gray-900">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


