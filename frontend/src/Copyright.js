import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import sellPointURL from "./sellPointURL";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={sellPointURL}>
        SellPoint
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
