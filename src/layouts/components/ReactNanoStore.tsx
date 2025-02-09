import React, { useEffect, useState } from "react";
import {
  shoppingCart,
  addProductToAPI,
  type Product,
  fetchProductsFromAPI,
  removeProductFromAPI,
} from "@/store/store";
import { useStore } from "@nanostores/react";
import { useQuery, useMutation } from "@tanstack/react-query";

// Custom hook
const useProductManager = () => {
  const cart = useStore(shoppingCart);
  const [products, setProducts] = useState<Product[]>([]);
  const [removingProductId, setRemovingProductId] = useState<string | null>(null);

  const productQuery = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProductsFromAPI,
    //@ts-expect-error On Succes callback is not defined in the type, but it is used in the code
    onSuccess: (data) => {
      setProducts(data);
    },
  });

  const addProductMutation = useMutation({
    mutationFn: addProductToAPI,
    onSuccess: (newProduct) => {
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    },
  });

  const removeProductMutation = useMutation({
    mutationFn: removeProductFromAPI,
    onSuccess: (_, productId) => {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId),
      );
      setRemovingProductId(null);
    },
  });

  const handleAddProduct = () => {
    addProductMutation.mutate({
      name: "Product 1",
      price: 10,
    });
  };

  const handleRemoveProduct = (productId: string) => {
    setRemovingProductId(productId);
    removeProductMutation.mutate(productId);
  };

  useEffect(() => {
    setProducts(cart);
  }, [cart]);

  return {
    products,
    removingProductId,
    productQuery,
    addProductMutation,
    handleAddProduct,
    handleRemoveProduct,
  };
};

// Component
export const ReactNanoStore = () => {
  const {
    products,
    removingProductId,
    productQuery,
    addProductMutation,
    handleAddProduct,
    handleRemoveProduct,
  } = useProductManager();

  return (
    <div>
      <h2>React Nano Store With TankStack Query</h2>
      <button onClick={handleAddProduct}>Add Product</button>
      {!productQuery.isFetching ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button
                onClick={() => handleRemoveProduct(product.id)}
                className="ml-2 text-red-500 cursor-pointer"
              >
                {removingProductId === product.id ? "Removing..." : "Remove"}
              </button>
            </li>
          ))}
          {addProductMutation.isPending && <li>Adding product...</li>}
        </ul>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};