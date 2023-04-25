import { Filter } from "@/types";
import { useState } from "react";

type Props = {
  onChange: (filter: Filter) => void;
};

export default function PriceRangeFilter({ onChange }: Props) {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

  function handleChangeMin(value: number) {
    setMin(value);

    onChange(
      value ? (product) => product.price >= min && product.price <= max : null
    );
  }

  function handleChangeMax(value: number) {
    setMax(value);

    onChange(
      value ? (product) => product.price >= min && product.price <= max : null
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        border: "1px solid black",
        padding: 12,
      }}
    >
      <h4>Price</h4>

      <label>Price Min:</label>
      <input
        onChange={(e) => handleChangeMin(Number(e.target.value))}
        name="priceMin"
        type="text"
        value={min}
      />
      <label>Price Max:</label>
      <input
        onChange={(e) => handleChangeMax(Number(e.target.value))}
        name="priceMax"
        type="text"
        value={max}
      />
    </div>
  );
}
