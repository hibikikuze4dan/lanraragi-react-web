export const ARCHIVE_STYLES = {
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#363940",
  },
  typography: {
    textTransform: "none",
    fontWeight: "bold",
    wordWrap: "anywhere",
    fontSize: ".8 rem",
    margin: 0,
  },
  clamp: {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "4",
    WebkitBoxOrient: "vertical",
  },
  grid: {
    paddingTop: "0 !important",
    paddingBottom: "2rem",
  },
  imageWrapper: {
    overflow: "hiddem",
    padding: ".5rem .5rem",
  },
  infoButton: {
    backgroundColor: "#43464E",
    borderRadius: "0 0 4px 0",
    boxShadow: "none",
    borderLeft: "1px solid #363940",
  },
  readButton: {
    backgroundColor: "#43464E",
    borderRadius: "0 0 0 4px",
    boxShadow: "none",
    borderRight: "1px solid #363940",
  },
  image: {
    objectFit: "cover",
    width: "100%",
    borderRadius: "4px",
    maxHeight: "300px",
  },
  imageWide: {
    objectFit: "contain",
    objectPosition: "left",
  },
  imageLong: {
    objectFit: "fill",
    objectPosition: "center",
    maxWidth: `${300 * (500 / 700)}px`,
  },
};
