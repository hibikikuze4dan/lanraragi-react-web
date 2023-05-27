/* eslint-disable indent */
export const scrollIntoViewByElement = (selector, timeout = 0) => {
  const element = document.querySelector(selector);
  return element
    ? setTimeout(element.scrollIntoView({ block: "end" }), timeout)
    : null;
};

export const scrollByCoordinates = (
  xCoordinate = 0,
  yCoordinate = 0,
  timeout = 0
) =>
  setTimeout(
    window.scrollTo({
      top: yCoordinate,
      left: xCoordinate,
      behavior: "smooth",
    }),
    timeout
  );

export const tagSeperator = (tag) => {
  const separatorIndex = tag.indexOf(":");
  if (separatorIndex === -1) return ["", tag];
  const [tagType] = tag.match(/^[^:]*:\s*/gm);
  const [, tagValue] = tag.split(/^[^:]*:\s*/gm);
  return [tagType.replace(":", ""), tagValue];
};

export const getTagsObjectFromTagsString = (tags) => {
  const tagsArray = tags.split(", ");
  return tagsArray.length
    ? tagsArray.reduce((acc, tag) => {
        const [tagType, tagValue] = tagSeperator(tag);
        const typeToSearchFor = tagType || "other";
        const currentTagTypeValues = acc[typeToSearchFor] ?? [];
        const exists = currentTagTypeValues.includes(tagValue);
        return {
          ...acc,
          [typeToSearchFor]: [
            ...currentTagTypeValues,
            ...(exists ? [] : [tagValue]),
          ],
        };
      }, {})
    : {};
};

export const isValidUrl = (urlString) => {
  try {
    return !!new URL(urlString);
  } catch (e) {
    return false;
  }
};

export const firstLetterToUppercase = (word = "") =>
  word.slice(0, 1).toUpperCase() + word.slice(1);

export const getNewSearchArchivesArrayAfterDeletingArchiveId = (
  searchArchives,
  archiveId
) => {
  const arcIndex = searchArchives.findIndex(({ arcid }) => arcid === archiveId);
  if (arcIndex === -1) return [...searchArchives];
  const newArchives = [...searchArchives];
  newArchives.splice(arcIndex, 1);
  return newArchives;
};
