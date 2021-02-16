import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    marginTop: "100px",
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardActions: {
    maxWidth: "100%",
    justifyContent: "space-between",
  },
  infoButton: {
    display: "flex",
    justifyContent: "flex-start",
    textDecorationLine: "none",
  },
  iconButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
