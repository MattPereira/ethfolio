export function shortenAddress(address) {
  if (!address) return "";

  const start = address.slice(0, 5);
  const end = address.slice(-3);

  return `${start}...${end}`;
}
