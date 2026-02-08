/**
 * Format price values to 2 decimal places
 * Handles multiple price formats: numbers, strings, and Mongo Decimal128 objects
 */
export const formatPrice = (value) => {
  if (typeof value === "number") return value.toFixed(2);
  if (typeof value === "string") return Number(value).toFixed(2);
  if (value?.$numberDecimal) return Number(value.$numberDecimal).toFixed(2);
  return "-";
};
