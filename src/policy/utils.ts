export function formatNumber(newValue: string, oldValue: string) {
  const parsed = Number(newValue);
  if (isNaN(parsed)) {
    return oldValue;
  }
  return newValue;
}
