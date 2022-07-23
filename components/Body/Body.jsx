/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import modcss from "./Body.module.css";
//
const Body = ({ children, ...rest }) => {
  const theme = useTheme();
  //
  return (
    <body
      css={{
        [theme.breakpoints.up("md")]: {
          overflow: "hidden",
        },
      }}
      className={`scrollbar-thin dark:text-slate-100 ${modcss.body}`}
      {...rest}
    >
      {children}
    </body>
  );
};

export default Body;
