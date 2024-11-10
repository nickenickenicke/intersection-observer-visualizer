export const calculateOffsetTop = (rootTop: number, rootBottom: number) => {
  const delta = (rootBottom - rootTop) * 2;
  return delta + "px";
};
