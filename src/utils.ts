export const ellipse = (str: string, max: number) => {
  return str.slice(0, max).trim() + (str.length > max ? "..." : "");
};
