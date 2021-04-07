import { Container, Typography } from "@material-ui/core";
import React from "react";

export default function Error() {
  return (
    <Container>
      <Typography variant="h3" align="center">
        Denne siden finnes ikke
      </Typography>
    </Container>
  );
}
