export const valueLabelFormat = (value) => {
  if (!value) return;
  value = value.toLocaleString("it-IT", { style : "currency", currency : "VND" });
  return `${value}`;
};