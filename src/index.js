import _ from "lodash";
import { getData } from "./api.js";
import { sortRls, flattenData } from "./utils.js";

const main = async () => {
  let festivalData = await getData();

  const flatData = flattenData(festivalData);

  const groupedRecordLabelData = _.chain(flatData)
    // Group the elements of Array based on `color` property
    .groupBy("recordLabel")
    .map((value, key) => ({ recordLabel: key, bands: value }))
    .value()
    .sort(sortRls);

  const structuredData = groupedRecordLabelData.map(
    ({ recordLabel, bands }) => ({
      recordLabel,
      bands: _.chain(bands)
        .groupBy("bandName")
        .map((value, key) => ({ band: key, festivals: value }))
        .value()
        .sort((a, b) => {
          return a.bandName > b.bandName ? 1 : -1;
        }),
    })
  );

  structuredData.forEach((sd) => {
    console.log("\n\n", sd.recordLabel);

    sd.bands.forEach((band) => {
      console.log(" ", band.band);
      if (band.festivals && band.festivals.length) {
        band.festivals
          .sort((a, b) => {
            return a.festival > b.festival ? 1 : -1;
          })
          .forEach((festival) => {
            if (festival.festival) {
              console.log("\t", festival.festival);
            }
          });
      }
    });
  });
};

main()
  .then(() => {
    console.log("\n\n\nsucess");
  })
  .catch((err) => {
    console.log(err);
  });
