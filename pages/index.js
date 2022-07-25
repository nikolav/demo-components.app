import React, { useEffect } from "react";
import LayoutMain from "../components/layout/LayoutMain";
import { Stack, Box, Button, Modal, Typography } from "../components/mui";
import { useStateSwitch } from "../src/hooks";
import { BoxTransition } from "../components";

export default function Index(props) {
  const { isActive, toggle } = useStateSwitch();

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
          effect={{ in: "flipInX", out: "flipOutX" }}
          duration={567}
          durationOut={234}
          className="w-32 h-32 bg-slate-400 rounded-lg"
        >
          22
        </BoxTransition>
      </section>
      {/*  */}
      {/* right */}
      <section>2</section>
    </LayoutMain>
  );
}
