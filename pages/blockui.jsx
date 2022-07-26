import { useState, useEffect, useRef } from "react";
import LayoutMain from "../components/layout/LayoutMain";
import { BoxTransition, BlockUI, Link } from "../components";
import { Box, Typography, ButtonGroup, Button, Popper } from "@mui/material";
import { useSocialLike, useStateSwitch } from "../src/hooks";
//
const PageBlockui = () => {
  // const { like, likeCount, isLiked } = useSocialLike("--blockui");
  //
  return (
    <LayoutMain>
      <section>
        1
      </section>
      {/*  */}
      <section className="space-y-4">2</section>
    </LayoutMain>
  );
};

export default PageBlockui;
