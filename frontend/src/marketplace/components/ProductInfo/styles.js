import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  main: {
    margin: "auto",
    paddingTop: "30px",
    maxWidth: "60%",
    justify: "center",
  },
  root: {
    width: "100%",
  },
  media: {
    height: "50px",
    paddingTop: "50%",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  sellerInfo: {
    maxWidth: "100%",
    justifyContent: "space-between",
  },
}));
