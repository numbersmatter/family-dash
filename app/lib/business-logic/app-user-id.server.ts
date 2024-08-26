export const getAppuserId = (userId: string) => {
  return userId.split("_", 2)[1];
};
