import React from "react";
import Link from "next/link";
import LayoutMain from "../components/layout/LayoutMain";
import { Paper, Box, MenuList, MenuItem, ListItemText } from "@mui/material";
////
/////
export default function Index({ ...rest }) {
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
              {
                name: "OverlayHover",
                link: "/overlay-hover",
              },
              {
                name: "Progress",
                link: "/progress",
              },
              {
                name: "Rotation",
                link: "/rotation",
              },
            ].map(({ link, name }) => (
              <Link href={link} key={name}>
                <MenuItem>
                  <ListItemText>{name}</ListItemText>
                </MenuItem>
              </Link>
            ))}
          </MenuList>
        </Paper>
      </section>
      {/*  */}
      {/* right */}
      <section>🚧</section>
    </LayoutMain>
  );
}
