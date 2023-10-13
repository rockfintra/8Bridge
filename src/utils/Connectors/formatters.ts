export const formatAddress = (value: string) => {
  return `${value.slice(0, 6)}...${value.slice(value.length - 6)}`;
};