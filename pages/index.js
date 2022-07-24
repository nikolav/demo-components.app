import React from "react";
import LayoutMain from "../components/layout/LayoutMain";
import { Button } from "../components/mui"

export default function Index(props) {

  return <LayoutMain {...props}>
    {/*  */}
    {/* left */}
    <section>
      <Button variant="outlined" color="primary">
        ok
      </Button>
    </section>
    {/*  */}
    {/* right */}
    <section>2</section>
  </LayoutMain>;
}
