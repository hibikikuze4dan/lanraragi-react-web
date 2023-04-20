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
