export const mergeObjectIntoConfig = (key, obj, config) => ({
  ...config,
  [key]: {
    ...config[key] || {},
    ...obj
  }
});

export const mergeStringIntoConfig = (key, str, config) => ({
  ...config,
  [key]: str
});
