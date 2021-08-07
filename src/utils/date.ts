export function formatDateYYYYMMDD(date: Date) {
  const format = {
    M: (date.getMonth() + 1).toString().padStart(2, '0'),
    D: date.getDate().toString().padStart(2, '0'),
    Y: date.getFullYear().toString().padStart(4, '0'),
  };

  return `${format.Y}${format.M}${format.D}`;
}
