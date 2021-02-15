import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  main: {
    margin: "auto",
    paddingTop: "100px",
    maxWidth: "60%",
    justify: "center",
  },
  root: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "300px", // 16:9
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    // textAlign: "center",
    height: "100px",
  },
}));
