import { useMemo, useState } from "react";

import api from "@/api";
import ColorFilter from "@/components/ColorFilter";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import ProductCard from "@/components/ProductCard";
import RatingFilter from "@/components/RatingFilter";
import type { Product, Filter } from "@/types";
import type { GetStaticProps } from "next";

type Props = {
  products: Product[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const products = await api.product.list();
  return {
    props: {
      products,
    },
  };
};

export default function Home({ products }: Props) {
  const [filters, setFilters] = useState<Record<string, Filter>>({
    price: null,
    color: null,
    rating: null,
  });

  const matches = useMemo(() => {
    const filtersToApply = Object.values(filters).filter(Boolean);
    let matches = products;

    for (const filter of filtersToApply) {
      matches = matches.filter(filter!);
    }

    return matches;
  }, [products, filters]);

  return (
    <main style={{ display: "flex", gap: 12 }}>
      <aside>
        <PriceRangeFilter
          onChange={(filter: Filter) =>
            setFilters({ ...filters, price: filter })
          }
        />
        <ColorFilter
          onChange={(filter: Filter) =>
            setFilters({ ...filters, color: filter })
          }
          products={products}
        />
        <RatingFilter
          onChange={(filter: Filter) =>
            setFilters({ ...filters, rating: filter })
          }
        />
      </aside>
      <section
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 12,
        }}
      >
        {matches.map((product) => (
          <article key={product.id}>
            <ProductCard product={product} />
          </article>
        ))}
      </section>
    </main>
  );
}
