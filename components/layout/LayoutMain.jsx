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
} from "@mui/material";
import { useStateSwitch } from "../../src/hooks";
import { DarkModeToggle, Link } from "../../components";
import {
  // GiAccordion,
  FaHome,
  RiGithubLine,
  MenuIcon,
  IoMdPower,
  // iconAccordionColor,
} from "../../components/icons";
import { useAuth } from "../../app/store";

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
  const { auth, logout } = useAuth();
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
                  {auth?.name ? `👋🏻 ${auth.name}` : "nikolav.rs"}
                </Typography>
              </a>
            </Link>
          </Stack>
          {/*  */}
          {/*  */}
          {/* links */}

          <Stack direction="row" className="items-center space-x-4">
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
              {
                component: "Details",
                icon: "🎫",
                link: "details",
              },
              {
                component: "Drag",
                icon: "🤚🏻",
                link: "drag",
              },
              {
                component: "DrawerBox",
                icon: "📦",
                link: "drawer-box",
              },
              {
                component: "DrawerDrag",
                icon: "🔃",
                link: "drawer-drag",
              },
              {
                component: "FloatingPanel",
                icon: "📟",
                link: "floating-panel",
              },
              {
                component: "IconCrossfade",
                icon: "🌟",
                link: "icon-crossfade",
              },
              {
                component: "Modal",
                icon: "💳",
                link: "modal",
              },
              {
                component: "OverlayHover",
                icon: "🎴",
                link: "overlay-hover",
              },
              {
                component: "Progress",
                icon: "🔋",
                link: "progress",
              },
            ].map(({ component, icon, link }) => (
              <Tooltip
                placement="bottom"
                title={`<${component}>`}
                key={component}
              >
                <strong className="inline-block">
                  <Link href={`/${link}`}>
                    <a className="font-bold appbar-link-icon text-xl">{icon}</a>
                  </Link>
                </strong>
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

            {auth && (
              <Tooltip placement="bottom" title="⛔ odjava">
                <IconButton onClick={logout}>
                  <IoMdPower className="text-3xl appbar-icon" />
                </IconButton>
              </Tooltip>
            )}
            {/*  */}
            {/* home */}
            <Link href="/">
              <IconButton>
                <FaHome className="text-3xl appbar-icon" />
              </IconButton>
            </Link>

            <Link href="https://github.com/nikolav/demo-components.app/tree/main/components">
              <a target="_blank">
                <IconButton size="md" className="ml-2">
                  <RiGithubLine className="appbar-icon" />
                </IconButton>
              </a>
            </Link>
            <DarkModeToggle />
          </Stack>
        </Toolbar>
      </AppBar>
      {/*  */}
      {/* content */}
      <Container>
        <Box maxWidth={972} pt="4rem" mx="auto" width={{ sm: "92%" }}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Grid item xs={12} md={6}>
              {children[0]}
            </Grid>
            <Grid item xs={12} md={6}>
              {children[1]}
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/*  */}
      {/*
       */}
      <Drawer anchor="left" open={isActiveDrawer} onClose={toggleDrawer.off}>
        {/*  */}
        {/* drawer.links */}
        <List sx={{ minWidth: 234 }}>
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
              key: "ChooseFile",
              icon: "📜",
              link: "/choose-file",
            },
            {
              key: "DarkModeToggle",
              icon: "🌜",
              link: "/dark-mode",
            },
            {
              key: "Details",
              icon: "🎫",
              link: "/details",
            },
            {
              key: "Drag",
              icon: "🤚🏻",
              link: "/drag",
            },
            {
              key: "DrawerBox",
              icon: "📦",
              link: "/drawer-box",
            },
            {
              key: "DrawerDrag",
              icon: "🔃",
              link: "/drawer-drag",
            },
            {
              key: "FloatingPanel",
              icon: "📟",
              link: "/floating-panel",
            },
            {
              key: "IconCrossfade",
              icon: "🌟",
              link: "/icon-crossfade",
            },
            {
              key: "Modal",
              icon: "💳",
              link: "/modal",
            },
            {
              key: "OverlayHover",
              icon: "🎴",
              link: "/overlay-hover",
            },
            {
              key: "Progress",
              icon: "🔋",
              link: "/progress",
            },
          ].map((node) => (
            <ListItem key={node.key} disablePadding onClick={toggleDrawer.off}>
              <Link href={node.link}>
                <ListItemButton>
                  <ListItemIcon>{node.icon}</ListItemIcon>
                  <ListItemText primary={node.key} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default LayoutMain;
