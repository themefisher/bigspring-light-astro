import { persistentAtom } from "@nanostores/persistent";
import { testApi } from "@/api/test";

export interface Product {
  id: string;
  name: string;
  price: number;
}

export const shoppingCart = persistentAtom<Product[]>("cart", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const fetchProductsFromAPI = async () => {
  const response = await testApi.get("/cart");
  const products: Product[] = response.data;
  shoppingCart.set(products);

  return products;
};

export const addProductToAPI = async (product: Partial<Product>) => {
  const response = await testApi.post("/cart", product, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const newProduct: Product = response.data;
  shoppingCart.set([...shoppingCart.get(), newProduct]);

  return newProduct;
};

export const updateProductInAPI = async (product: Product) => {
  const response = await testApi.put(`/cart/${product.id}`, product, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const updatedProduct: Product = response.data;
  shoppingCart.set(
    shoppingCart
      .get()
      .map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
  );

  return updatedProduct;
};

export const removeProductFromAPI = async (productId: string) => {
  await testApi.delete(`/cart/${productId}`);
  shoppingCart.set(shoppingCart.get().filter((p) => p.id !== productId));

  return productId;
};
