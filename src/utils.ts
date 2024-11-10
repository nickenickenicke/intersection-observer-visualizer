export const calculateOffsetTop = (rootTop: number, rootBottom: number) => {
  const delta = (rootBottom - rootTop) * 2;
  return delta + "px";
};

export const calculateOffsetLeft = (rootLeft: number, rootRight: number) => {
  const delta = (rootRight - rootLeft) * 3.5;
  return delta + "px";
};

export const calculateScale = (rootOne: number, rootTwo: number) => {
  const scaleChange = (rootOne + rootTwo) / 100;
  return 1 + scaleChange;
};
