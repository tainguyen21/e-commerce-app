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

export const calculateResponse = (messages) => {
  let totalInbox = 0;
  let replied = 0;

  for (let key in messages) {
    totalInbox++;
    if (messages[key].findIndex((item) => item.other === false) !== -1)
      replied++;
  }

  return totalInbox === 0 ? null : parseInt((replied / totalInbox) * 100);
};
