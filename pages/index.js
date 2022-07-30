import React, { useRef } from "react";
import Link from "next/link";
import LayoutMain from "../components/layout/LayoutMain";
import {
  Box,
  Divider,
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  Button,
} from "@mui/material";
import { usePlotChart, usePieChart, useStateSwitch } from "../src/hooks";
////
/////
export default function Index({ ...rest }) {
  const root = useRef();
  const { isActive, toggle } = useStateSwitch();
  //
  usePlotChart({
    // usePieChart({
    isActive,
    root: root?.current,
    data: [
      {
        date: "2022-05-12",
        value: 11,
      },
      {
        date: "2022-05-15",
        value: 14,
      },
      {
        date: "2022-05-03",
        value: 14,
      },
      {
        date: "2022-05-18",
        value: 21,
      },
      {
        date: "2022-05-30",
        value: 12,
      },
      {
        date: "2022-05-31",
        value: 22,
      },
      // {
      //   key: "@1",
      //   value: 11,
      // },
      // {
      //   key: "@2",
      //   value: 12,
      // },
      // {
      //   key: "@3",
      //   value: 21,
      // },
      // {
      //   key: "@4",
      //   value: 15,
      // },
    ],
  });
  ////
  return (
    <LayoutMain {...rest}>
      {/*  */}
      {/* left */}
      <section>
        <Paper component="p" elevation={2} className="p-4 leading-relaxed">
          Pozdrav 👋🏻 <br />
          Trenutno radim na ovoj aplikaciji. <br />
          Planiram da postavim komponente iz{" "}
          <a
            href="https://github.com/nikolav/demo-components.app/tree/main/components"
            target="_blank"
            rel="noreferrer"
            className="link text-primary"
          >
            ovog foldera
          </a>
          . <br />
          <Divider className="my-4" />
          <MenuList className="p-4">
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
          <Box component="p" className="p-4 opacity-80">
            Hvala, svako dobro.
          </Box>
        </Paper>
      </section>
      {/*  */}
      {/* right */}
      <section>
        <Button  onClick={toggle}>OK</Button>
        <div className="m-0 p-0" ref={root} id="canvas" />
      </section>
    </LayoutMain>
  );
}
