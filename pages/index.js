import React, { useEffect, useState } from "react";
import LayoutMain from "../components/layout/LayoutMain";
import {
  FormGroup,
  Checkbox,
  FormControlLabel,
  Stack,
  Box,
  Button,
  Modal,
  Typography,
  Popper,
  Popover,
} from "@mui/material";
import { useStateSwitch } from "../src/hooks";
import { BoxTransition } from "../components";
import img from "../public/accordion.props.default.jpg"

export default function Index(props) {
  const { isActive, toggle } = useStateSwitch();
  //
  return (
    <LayoutMain {...props}>
      {/*  */}
      {/* left */}
      <section>
        <Button variant="outlined" color="primary" onClick={toggle}>
          ok
        </Button>
        <BoxTransition
          isActive={isActive}
          effect={{ in: "rotateIn", out: "rotateOut" }}
          duration={1222}
          durationOut={466}
        >
          <Box
            component="img"
            src={img.src}
            className="block p-1 bg-white shadow"
            width={312}
            height="auto"
          >
          </Box>
        </BoxTransition>

        
      </section>
      {/*  */}
      {/* right */}
      <section>2</section>
    </LayoutMain>
  );
}
