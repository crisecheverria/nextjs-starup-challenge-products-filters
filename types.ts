export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  color: string;
  currency: string;
  releaseDate: string;
  categoryId: number;
  rating: number;
};

export type Filter = null | ((product: Product) => boolean);
