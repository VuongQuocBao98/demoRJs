export const getPathNameFromUrl = (url: any) => {
  if (!url || typeof url !== 'string') return url;
  return url.substring(url.lastIndexOf('/') + 1);
};

export const getOnlyNameFile = (url: any) => {
  if (!url) return; 
  const pathName = getPathNameFromUrl(url);
  return pathName.substring(0, pathName.indexOf('.'));
};
