import { useStateSwitch } from "../../src/hooks";
import { DarkModeToggle, Link } from "../../components";

import {
  AppBar,
  Box,
  // Button,
  Container,
  // Divider,
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
  Tooltip,
  Typography,
} from "../../components/mui";
import {
  // GiAccordion,
  FaHome,
  RiGithubLine,
  MenuIcon,
  // iconAccordionColor,
} from "../../components/icons";

//
// const imgAccordion = (
//   <img
//     src={iconAccordionColor.src}
//     alt=""
//     style={{ display: "inline-block", width: "2.11rem", height: "2.11rem" }}
//   />
// );
//
// @todo.slider
//   https://codesandbox.io/s/bold-hill-stmnwk?file=/src/App.js
// https://next-auth.js.org/getting-started/example#frontend---add-react-hook
/////
const LayoutMain = ({ children }) => {
  const { isActive: isActiveDrawer, toggle: toggleDrawer } = useStateSwitch();
  ////
  ////
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
                  className="opacity-[.56] transition-transform hover:opacity-100 hover:scale-[1.012]"
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
            {[
              {
                component: "Accordion",
                icon: "📰",
                link: "accordion",
              },
              {
                component: "BlockUI",
                icon: "⛔",
                link: "blockui",
              },
              {
                component: "BoxTransition",
                icon: "🍱",
                link: "box-transition",
              },
              {
                component: "ChooseFile",
                icon: "📜",
                link: "choose-file",
              },
              {
                component: "DarkModeToggle",
                icon: "🌜",
                link: "dark-mode",
              },
            ].map(({ component, icon, link }) => (
              <Tooltip
                placement="bottom"
                title={`<${component}>`}
                key={component}
              >
                <Box component="strong">
                  <Link href={`/${link}`}>
                    <a className="appbar-link-icon text-xl">{icon}</a>
                  </Link>
                </Box>
              </Tooltip>
            ))}
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
                <FaHome className="text-3xl appbar-icon" />
              </IconButton>
            </Link>

            <IconButton size="md" className="ml-2">
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
      <Box maxWidth={972} pt="4rem" mx="auto" width={{ sm: "92%" }}>
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
                // icon: imgAccordion,
                icon: "📰",
                link: "/accordion",
              },
              {
                key: "BlockUI",
                icon: "⛔",
                link: "/blockui",
              },
              {
                key: "BoxTransition",
                icon: "🍱",
                link: "/box-transition",
              },
              {
                key: "BoxTransition",
                icon: "📜",
                link: "/choose-file",
              },
              {
                key: "DarkModeToggle",
                icon: "🌜",
                link: "/dark-mode",
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
