import React, { useState } from "react";
import Link from "next/link";
import LayoutMain from "../components/layout/LayoutMain";
import {
  Box,
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  Button,
} from "@mui/material";
import { BoxSwitch } from "../components";
////
/////
export default function Index({ ...rest }) {
  const [k$, setk] = useState("a");
  ////
  return (
    <LayoutMain {...rest}>
      {/*  */}
      {/* left */}
      <section>
        <Paper elevation={2} className="p-4 leading-relaxed">
          <Box component="p">
            Pozdrav 👋🏻 <br />
            Trenutno radim na ovoj aplikaciji. <br />
            Planiram da postavim komponente iz{" "}
          </Box>
          <a
            href="https://github.com/nikolav/demo-components.app/tree/main/components"
            target="_blank"
            rel="noreferrer"
            className="link text-primary"
          >
            ovog foldera
          </a>
          .
          <MenuList className="p-4 mt-4">
            {[
              {
                name: "Accordion",
                link: "/accordion",
              },
              {
                name: "BlockUI",
                link: "/blockui",
              },
              {
                name: "BoxTransition",
                link: "/box-transition",
              },
              {
                name: "ChooseFile",
                link: "/choose-file",
              },
              {
                name: "DarkModeToggle",
                link: "/dark-mode",
              },
              {
                name: "Details",
                link: "/details",
              },
              {
                name: "Drag",
                link: "/drag",
              },
              {
                name: "DrawerBox",
                link: "/drawer-box",
              },
              {
                name: "DrawerDrag",
                link: "/drawer-drag",
              },
              {
                name: "FloatingPanel",
                link: "/floating-panel",
              },
            ].map(({ link, name }) => (
              <Link href={link} key={name}>
                <MenuItem>
                  <ListItemText>{name}</ListItemText>
                </MenuItem>
              </Link>
            ))}
          </MenuList>
          <Box className="p-4 opacity-80">Hvala, svako dobro.</Box>
        </Paper>
      </section>
      {/*  */}
      {/* right */}
      <section>
        <Button onClick={() => setk("a" === k$ ? "b" : "a")}>OK</Button>
        {/* <BoxSwitch
          key={k$}
          components={{
            a: <div className="bg-red-200 w-32 h-32">A</div>,
            b: <div className="bg-blue-200 w-32 h-32">B</div>,
          }}
        /> */}
      </section>
    </LayoutMain>
  );
}
