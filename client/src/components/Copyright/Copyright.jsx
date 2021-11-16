import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Copyright = () => {
  return (
    <Typography variant="body2" color="#fff" align="center">
      {"Copyright © "}
      <Link href="#" color="#fff">
        KPMG TASKS
      </Link>{" "}
      {new Date().getFullYear()}{" "}
      <Link href="#" color="#fff">
        | Privacy Terms |
      </Link>{" "}
      <Link href="#" color="#fff">
        Policy
      </Link>{" "}
    </Typography>
  );
};

export default Copyright;
