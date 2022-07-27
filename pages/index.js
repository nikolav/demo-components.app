import React from "react";
import Link from "next/link";
import LayoutMain from "../components/layout/LayoutMain";
import {
  Box,
  Divider,
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
} from "@mui/material";
////
/////
export default function Index(props) {
  //
  return (
    <LayoutMain {...props}>
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
      <section>👷🏻‍♂️🚧</section>
    </LayoutMain>
  );
}
