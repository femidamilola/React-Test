import Items from "../../data/items.json";
import { Item } from "../../interfaces/item";

// A mock function to mimic making an async request for data
export function fetchItems(): Promise<{ data: Item[] }> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: Items }), 500)
  );
}
