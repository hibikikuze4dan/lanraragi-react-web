export const scrollIntoViewByElement = (selector, timeout = 0) =>
  setTimeout(
    document.querySelector(selector).scrollIntoView({ block: "end" }),
    timeout
  );

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
