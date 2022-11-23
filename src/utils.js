import { DEFAULT_RECORDER } from "./constants.js";

export const flattenData = (festivalData) =>
  festivalData.reduce((acc, fd) => {
    fd.bands?.forEach((band) => {
      acc = [
        ...acc,
        {
          recordLabel: band.recordLabel || DEFAULT_RECORDER,
          bandName: band.name,
          festival: fd.name,
        },
      ];
    });
    return acc;
  }, []);

export const sortRls = (a, b) => {
  if (a.recordLabel === DEFAULT_RECORDER) {
    return 1;
  }
  if (b.recordLabel === DEFAULT_RECORDER) {
    return -1;
  }
  return a.recordLabel > b.recordLabel ? 1 : -1;
};
