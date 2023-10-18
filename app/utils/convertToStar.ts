export const convertToStars = (rating: number) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - fullStars);
  const emptyStars = maxStars - fullStars - halfStars;

  return "★".repeat(fullStars) + "☆".repeat(halfStars) + "☆".repeat(emptyStars);
};
