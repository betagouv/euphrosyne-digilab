export const ellipse = (str: string | null, max: number) => {
  if (!str) return "";
  return str.slice(0, max).trim() + (str.length > max ? "..." : "");
};

export const formatDatingLabel = (label: string) =>
  label.split("> ").pop() || "";
