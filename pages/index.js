import React, { useState } from "react";
import Link from "next/link";
import LayoutMain from "../components/layout/LayoutMain";
import {
  Paper,
  Box,
  MenuList,
  MenuItem,
  ListItemText,
  Button,
  ButtonGroup,
} from "@mui/material";
import { ProgressRing, SwitchIcon, BoxSwitch } from "../components";
////
/////
export default function Index({ ...rest }) {
  const [p$, setp] = useState(1);
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
        <ButtonGroup size="large" variant="outlined" color="primary">
          <Button
            onClick={() => setp((p) => p + 1)}
            className="flex items-center justify-between px-2 space-x-2"
          >
            <strong className="flex h-6">
              <ProgressRing
                bg="rgba(0,0,0,.045)"
                duration={1111}
                progress={p$ * 25}
                width={100}
                rounded={false}
                allowDecrease
              />
            </strong>
            <strong>dalje</strong>
          </Button>
          <Button onClick={() => setp(1)}>
            reset
          </Button>
        </ButtonGroup>
        <BoxSwitch
          duration={634}
          components={{
            1: (
              <Paper elevation={2} className="w-64 h-48 bg-red-200">
                1
              </Paper>
            ),
            2: (
              <Paper elevation={2} className="w-64 h-48 bg-blue-200">
                2
              </Paper>
            ),
            3: (
              <Paper elevation={2} className="w-64 h-48 bg-yellow-200">
                3
              </Paper>
            ),
            4: (
              <Paper elevation={2} className="w-64 h-48 bg-green-200">
                4
              </Paper>
            ),
          }}
          current={p$}
        />
      </section>
    </LayoutMain>
  );
}
