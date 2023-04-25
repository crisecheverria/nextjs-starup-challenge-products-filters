import { Product, Filter } from "@/types";
import { useMemo, useState } from "react";

type Props = {
  products: Product[];
  onChange: (filter: Filter) => void;
};

export default function ColorFilter({ products, onChange }: Props) {
  const [selected, setSelected] = useState<Set<string>>(() => new Set());

  const colors = useMemo(() => {
    const colors = new Set<string>();
    products.forEach((product) => {
      colors.add(product.color);
    });

    return Array.from(colors);
  }, [products]);

  function handleChange(color: string, isChecked: boolean) {
    const draft = structuredClone(selected);

    if (isChecked) {
      draft.add(color);
    } else {
      draft.delete(color);
    }

    onChange(draft.size ? (product) => draft.has(product.color) : null);

    setSelected(draft);
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
      <h4>Colors</h4>
      <ul
        style={{
          listStyle: "none",
        }}
      >
        {colors.map((color) => (
          <li key={color} style={{ display: "flex", gap: 12 }}>
            <input
              onChange={(e) => handleChange(color, e.target.checked)}
              name="color"
              type="checkbox"
              value={color}
            />
            <label>{color}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
