/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useStateSwitch } from "../../src/hooks";
import { DarkModeToggle, Link } from "../../components";

import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "../../components/mui";
import {
  GiAccordion,
  FaHome,
  RiGithubLine,
  MenuIcon,
} from "../../components/icons";
// @todo.slider
//   https://codesandbox.io/s/bold-hill-stmnwk?file=/src/App.js
// https://next-auth.js.org/getting-started/example#frontend---add-react-hook
/////
const LayoutMain = ({ children }) => {
  const { isActive: isActiveDrawer, toggle: toggleDrawer } = useStateSwitch();
  return (
    <>
      <AppBar position="static">
        {/*  */}
        <Toolbar className="flex items-center justify-between">
          <Stack direction="row" className="items-center">
            {/*  */}
            {/* icon.menu */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer.on}
            >
              <MenuIcon className="appbar-icon" />
            </IconButton>
            {/*  */}
            {/* link.admin */}
            <Link href="https://nikolav.rs/">
              <a target="_blank" className="inline-block ml-4 origin-center">
                <Typography
                  variant="h6"
                  component="h1"
                  sx={{ flexGrow: 1 }}
                  css={css`
                    transition: transform 0.122s ease;
                    opacity: 0.55;
                    &:hover {
                      opacity: 1;
                      transform: scale(1.022);
                    }
                  `}
                >
                  nikolav.rs
                </Typography>
              </a>
            </Link>
          </Stack>
          {/*  */}
          {/*  */}
          {/* links */}

          <Stack direction="row" className="items-center space-x-2">
            {/*  */}
            {/* .accordion */}
            <Link href="/accordion">
              <a className="appbar-link">accordion</a>
            </Link>
            {/*  */}
            {/* .block-ui */}
            <Link href="/blockui">
              <a className="appbar-link">block-ui</a>
            </Link>
          </Stack>
          {/*  */}
          {/* menu.right */}
          <Stack
            direction="row"
            // spacing={12}
            className="items-center space-x-2"
          >
            {/*  */}
            {/* home */}

            <Link href="/">
              <IconButton>
                <FaHome className="mr-2 text-4xl appbar-icon" />
              </IconButton>
            </Link>

            <IconButton size="md">
              <Link href="https://github.com/nikolav">
                <a target="_blank">
                  <RiGithubLine className="appbar-icon" />
                </a>
              </Link>
            </IconButton>
            <DarkModeToggle />
          </Stack>
        </Toolbar>
      </AppBar>
      {/*  */}
      {/* content */}
      <Box
        maxWidth={972}
        pt="4rem"
        mx="auto"
        width={{ sm: "92%" }}
        css={css`
          /* background-color: #ddd; */
        `}
      >
        <Container>
          <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Grid item xs={12} md={6}>
              {children[0]}
            </Grid>
            <Grid item xs={12} md={6}>
              {children[1]}
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/*  */}
      {/*
       */}
      <Drawer anchor="left" open={isActiveDrawer} onClose={toggleDrawer.off}>
        {/*  */}
        {/* drawer.links */}
        <Box minWidth={234}>
          <List>
            {[
              {
                key: "Accordion",
                icon: (
                  <GiAccordion className="appbar-icon text-primary dark:text-white/50" />
                ),
                link: "/accordion",
              },
              {
                key: "BlockUI",
                icon: "⛔",
                link: "/blockui",
              },
            ].map((node) => (
              <ListItem
                key={node.key}
                disablePadding
                onClick={toggleDrawer.off}
              >
                <Link href={node.link}>
                  <ListItemButton>
                    <ListItemIcon>{node.icon}</ListItemIcon>
                    <ListItemText primary={node.key} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default LayoutMain;
