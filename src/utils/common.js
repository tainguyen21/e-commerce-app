export const calculateRating = (rating) => {
  let stars = 0,
    totalRating = 0;
  for (let i in rating) {
    stars += i * rating[i];
    totalRating += rating[i];
  }

  return totalRating === 0 ? "Don't have rating" : stars / totalRating;
};

export const calculateResponse = (response) => {
  let { rep, total } = response;

  return total === 0 ? null : (rep / total) * 100;
};

export const formatDate = (date) => {
  const result = date.split("/");
  const temp = result[0];
  result[0] = result[1];
  result[1] = temp;
  return result.join("/");
};
