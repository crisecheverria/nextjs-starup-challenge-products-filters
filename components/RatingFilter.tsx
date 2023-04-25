import { Filter } from "@/types";
import { useState } from "react";

type Props = {
  onChange: (filter: Filter) => void;
};

export default function RatingFilter({ onChange }: Props) {
  const [selected, setSelected] = useState<Set<number>>(() => new Set());

  function handleChange(rating: number, isChecked: boolean) {
    const draft = structuredClone(selected);

    if (isChecked) {
      draft.add(rating);
    } else {
      draft.delete(rating);
    }

    onChange(draft.size ? (product) => draft.has(product.rating) : null);
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
      <h4>Ratings</h4>
      <ul
        style={{
          listStyle: "none",
        }}
      >
        {[5, 4, 3, 2, 1].map((rating) => (
          <li key={rating} style={{ display: "flex", gap: 12 }}>
            <input
              onChange={(e) => handleChange(rating, e.target.checked)}
              name="rating"
              type="checkbox"
              value={rating}
            />
            <label>{"★".repeat(rating).padEnd(5, "☆")}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
