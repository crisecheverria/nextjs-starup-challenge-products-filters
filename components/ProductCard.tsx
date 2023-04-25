import type { Product } from "@/types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <img src={product.image} alt={product.image} />
      <h3>{product.name}</h3>
      <p>{"★".repeat(product.rating).padEnd(5, "☆")}</p>
      <p>
        {product.price.toLocaleString("en-SV", {
          style: "currency",
          currency: "SEK",
        })}
      </p>
    </div>
  );
}
