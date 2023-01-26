import Items from '../../data/items.json'

// A mock function to mimic making an async request for data
export function fetchItems() {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: Items }), 500)
    );
}
