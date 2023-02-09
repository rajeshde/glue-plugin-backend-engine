
export const unique = async (array: any[]) => {
  const unique = [];
  const seen = new Map();

  for await (const item of array) {
    const itemKey = JSON.stringify(item);
    if (!seen.has(itemKey)) {
      seen.set(itemKey, true);
      unique.push(item);
    }
  }

  return unique;
};
