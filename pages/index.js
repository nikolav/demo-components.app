import React, { useRef } from "react";
import Link from "next/link";
import LayoutMain from "../components/layout/LayoutMain";
import { Paper, Box, MenuList, MenuItem, ListItemText } from "@mui/material";
import { useBarChart } from "../src/hooks"
////
/////
export default function Index({ ...rest }) {
  const root = useRef()
  useBarChart({
    root: root?.current, 
    options: {
      color: "steelblue",
    },
    data: [
      {
        key: "🍎", 
        value: 12,
      },
      {
        key: "🍌", 
        value: 14,
      },
      {
        key: "🍒", 
        value: 22,
      },
      {
        key: "🍊", 
        value: 32,
      },
      {
        key: "🍉", 
        value: 2,
      },
    ]
  })
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
              {
                name: "IconCrossfade",
                link: "/icon-crossfade",
              },
              {
                name: "Modal",
                link: "/modal",
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
        🚧
        <div ref={root} />
      </section>
    </LayoutMain>
  );
}

// https://codesandbox.io/s/framer-motion-5-drag-to-reorder-tabs-forked-ujptnm
