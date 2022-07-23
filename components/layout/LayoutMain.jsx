/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DarkModeToggle, Link } from "../../components";
import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  MenuIcon,
  Stack,
} from "../../components/mui";
import { FaHome, RiGithubLine } from "../../components/icons";
// @todo.slider
//   https://codesandbox.io/s/bold-hill-stmnwk?file=/src/App.js
//
// import {
//   ProgressBar,
//   ProgressBarVertical,
//   Slider,
//   ProgressRing,
//   Modal,
//   DarkModeToggle,
//   Drag,
// } from "../components";
//
// https://next-auth.js.org/getting-started/example#frontend---add-react-hook
const LayoutMain = ({ children, ...rest }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar className="flex justify-between items-center">
          <Stack direction="horizontal" className="items-center">
            {/* icon.menu */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon className="appbar-icon" />
            </IconButton>
            {/* link.admin */}
            <Link href="https://nikolav.rs/">
              <a target="_blank">
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

          <Stack direction="horizontal" className="items-center">
            {/*  */}
            {/* accordion */}
            <Link href="accordion">
              <a className="appbar-link">accordion</a>
            </Link>
          </Stack>

          <Stack
            direction="horizontal"
            // spacing={12}
            className="items-center space-x-2"
          >
            {/*  */}
            {/* home */}

            <Link href="/">
              <IconButton>
                <FaHome className="appbar-icon text-4xl mr-2" />
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
    </>
  );
};

export default LayoutMain;
