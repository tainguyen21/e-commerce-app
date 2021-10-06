export const calculateRating = (rating) => {
  if (!rating) return null;

  let stars = 0,
    totalRating = 0;
  for (let i in rating) {
    stars += i * rating[i];
    totalRating += rating[i];
  }

  return totalRating === 0 ? "Don't have rating" : stars / totalRating;
};

export const calculateResponse = (response) => {
  if (!response) return null;

  let { rep, total } = response;

  return total === 0 ? null : (rep / total) * 100;
};

export const formatDate = (date) => {
  if (!date) return null;

  const result = date.split("/");
  const temp = result[0];
  result[0] = result[1];
  result[1] = temp;
  return result.join("/");
};

export const converFileListToArray = (image) => {
  if (!image) return null;

  const images = [];

  for (let i = 0; i < image.length; i++) {
    images.push(image[i]);
  }

  return images;
};
