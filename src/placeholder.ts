export function getDeterministicPlaceholderImage(id: string) {
  const placeholderImages = [
    "/images/placeholders/placeholder-1.jpg",
    "/images/placeholders/placeholder-2.jpg",
  ];
  return deterministicItemSelector(id, placeholderImages);
}

/**
 * Maps a string ID to an item from a list consistently using a hash function
 * @param id - The string ID to use for mapping
 * @param items - Array of items to pick from
 * @returns An item from the provided list, deterministically selected based on the ID
 * @throws Error if the items array is empty
 */
export function deterministicItemSelector<T>(id: string, items: T[]): T {
  if (items.length === 0) {
    throw new Error("Items array cannot be empty");
  }

  // Create a simple hash from the ID string
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    // Use char code and position to generate a number
    hash = (hash << 5) - hash + id.charCodeAt(i);
    // Convert to 32-bit integer
    hash = hash & hash;
  }

  // Make hash positive and get modulo items.length
  // This ensures we get an index between 0 and items.length-1
  const index = Math.abs(hash) % items.length;

  return items[index];
}
