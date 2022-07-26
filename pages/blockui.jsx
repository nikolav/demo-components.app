import { useState, useEffect, useRef, Fragment } from "react";
import Head from "next/head";
import LayoutMain from "../components/layout/LayoutMain";
import { Link, BoxTransition, BlockUI, ProgressRing } from "../components";
import {
  Stack,
  Box,
  Typography,
  Chip,
  ButtonGroup,
  Button,
  Tooltip,
  Popper,
  Card,
  CardContent,
  CardActions,
  ClickAwayListener,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  useCountDown,
  useSocialLike,
  useStateSwitch,
  useBodyOverflow,
} from "../src/hooks";
import {
  BsCodeSlash,
  FaGithubAlt,
  ArrowDropDownIcon,
  IconContentPaste,
  MdSettings,
  MdMonitor,
  MdNetworkCheck,
} from "../components/icons";
import { prevent } from "../src/util";
//
//
const LINK_WIKI_HTTP =
  "https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol?oldformat=true";
const LINK_GITHUB_COMPONENT =
  "https://github.com/nikolav/demo-components.app/blob/main/components/BlockUI/BlockUI.jsx";
//
const PageBlockui = () => {
  const { like, likeCount, isLiked } = useSocialLike("--BlockUI");
  //
  const { isActive, toggle: toggleActive } = useStateSwitch();
  const { isActive: isOpenPopper, toggle: togglePopper } = useStateSwitch();
  useEffect(() => {
    isActive && togglePopper.on();
  }, [isActive]);
  //
  const refButton = useRef();
  //
  const overflow = useBodyOverflow();
  useEffect(() => {
    overflow.hidden(isOpenPopper);
  }, [isOpenPopper]);
  //
  const refButtons = useRef();
  const { isActive: isMenu, toggle: toggleMenu } = useStateSwitch();
  const { isActive: isPopperMenu, toggle: togglePopperMenu } = useStateSwitch();
  useEffect(() => {
    isMenu && togglePopperMenu.on();
  }, [isMenu]);
  //
  const { isActive: isBlockui, toggle: toggleBlockui } = useStateSwitch();
  const { count, start } = useCountDown(toggleBlockui.off);
  //
  // show screen for [t] seconds
  const blockui = () => {
    toggleBlockui.on();
    start(5);
  };
  //
  // blockui.default
  const { isActive: isDefault, toggle: toggleDefault } = useStateSwitch();
  const { start: start_d } = useCountDown(toggleDefault.off);
  const blockui_d = () => {
    toggleDefault.on();
    start_d(3);
  };
  //
  // blockui.default
  const [p$, setp] = useState(0);
  const { isActive: isNetw, toggle: toggleNetw } = useStateSwitch();
  const { start: start_n } = useCountDown(toggleNetw.off);
  const blockui_n = () => {
    toggleNetw.on();
    start_n(4);
  };
  useEffect(() => {
    setp(isNetw ? 100 : 0);
  }, [isNetw]);
  //
  return (
    <LayoutMain>
      <section className="flex justify-center">
        <Head>
          <title>nikolav | BlocUI, ReactJS</title>
        </Head>
        <Box mt="3rem">
          <ButtonGroup ref={refButtons} variant="outlined" size="large">
            <Button onClick={prevent(blockui)}>BLOKIRAJ EKRAN</Button>
            <Button onClick={toggleMenu.on}>
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </section>

      {/*  */}
      <section className="space-y-4">
        <Box>
          <Stack mb={2} direction="row" className="justify-center">
            <ButtonGroup variant="outlined" size="small">
              <Tooltip placement="top" title="🔎 props">
                <Button ref={refButton} onClick={toggleActive}>
                  <BsCodeSlash className="icon-primary" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="komponenta @github">
                <Button>
                  <Link href={LINK_GITHUB_COMPONENT}>
                    <a target="_blank">
                      <FaGithubAlt className="icon-primary" />
                    </a>
                  </Link>
                </Button>
              </Tooltip>
              <Button onClick={like}>
                <span className={isLiked() ? "opacity-100" : "opacity-50"}>
                  {isLiked() ? "💙" : "🤍"} {likeCount}
                </span>
              </Button>
            </ButtonGroup>
          </Stack>
          <p>
            Ne zaboravite da dodate BlockUI komponentu aplikaciji dok je sistem
            zauzet{" "}
            <Tooltip placement="top" title="🌐 Hypertext Transfer Protocol">
              <Box component="strong">
                <Link href={LINK_WIKI_HTTP}>
                  <a target="_blank" className="link text-primary">
                    HTTP
                  </a>
                </Link>
              </Box>
            </Tooltip>{" "}
            zahtevom. Blokira pristup korisnika drugim događajima ili radnjama
            dok čeka da se proces završi.
          </p>
        </Box>
        <Box fontSize="89%" sx={{ opacity: 0.56 }}>
          <p>
            <Chip label="en" variant="outlined" />
          </p>
          <p>
            Don{"'"}t forget to add BlockUI component to the application while
            system is busy with a http request. It bocks user access to other
            events or actions while waiting for the process to finish.
          </p>
        </Box>
        <>
          {/*  */}
          {/*  */}
          {/* @@popper.props */}
          <Popper
            open={isOpenPopper}
            anchorEl={refButton.current}
            placement="bottom"
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, -128],
                },
              },
            ]}
            keepMounted
            transition
          >
            {({ TransitionProps }) => (
              <BoxTransition
                effect={{ in: "flipInY", out: "flipOutY" }}
                isActive={isActive}
                onExited={togglePopper.off}
                {...TransitionProps}
              >
                <ClickAwayListener onClickAway={toggleActive.off}>
                  <Card
                    className="shadow-lg"
                    sx={{ maxWidth: 356, p: ".5rem" }}
                  >
                    <CardContent>
                      <Typography
                        className="font-bold text-center mb-2"
                        variant="h5"
                        component="h2"
                      >
                        BlockUI --props
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Box component="dl">
                          {[
                            {
                              key: "isActive",
                              value: "otvara `BlockUI` ekran",
                            },
                          ].map((node) => (
                            <Fragment key={node.key}>
                              <dt className="font-bold">{node.key}</dt>
                              <dd className="pl-1 opacity-80">{node.value}</dd>
                            </Fragment>
                          ))}
                        </Box>
                      </Typography>
                    </CardContent>
                    <CardActions className="justify-center">
                      <Button
                        onClick={toggleActive.off}
                        dense
                        color="secondary"
                        size="small"
                        variant="outlined"
                      >
                        ok, hvala
                      </Button>
                    </CardActions>
                  </Card>
                </ClickAwayListener>
              </BoxTransition>
            )}
          </Popper>
          {/*  */}
          {/*  */}
          {/* @@popper.menu */}
          <Popper
            open={isPopperMenu}
            anchorEl={refButtons.current}
            placement="bottom-start"
            keepMounted
            transition
          >
            {({ TransitionProps }) => (
              <BoxTransition
                isActive={isMenu}
                // effect={{ in: "fadeIn", out: "fadeOut" }}
                duration={234}
                durationOut={122}
                onExited={togglePopperMenu.off}
                {...TransitionProps}
              >
                <ClickAwayListener onClickAway={toggleMenu.off}>
                  <Paper className="shadow-md" sx={{ minWidth: "36ch" }}>
                    <MenuList>
                      <MenuItem onClick={blockui_d}>
                        <ListItemIcon>
                          <MdMonitor />
                        </ListItemIcon>
                        <ListItemText>Podrazumevani ekran</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                          [3s]
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={blockui_n}>
                        <ListItemIcon>
                          <MdNetworkCheck />
                        </ListItemIcon>
                        <ListItemText>
                          Simuliraj aktivnost na mreži
                        </ListItemText>
                        <Typography variant="body2" color="text.secondary">
                          [4s]
                        </Typography>
                      </MenuItem>
                      <MenuItem disabled>
                        <ListItemIcon>
                          <IconContentPaste fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Zalepi</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                          [⌘V]
                        </Typography>
                      </MenuItem>
                      <Divider />
                      <MenuItem disabled>
                        <ListItemIcon>
                          <MdSettings />
                        </ListItemIcon>
                        <ListItemText>Podesi</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                          [⌘K]
                        </Typography>
                      </MenuItem>
                    </MenuList>
                  </Paper>
                </ClickAwayListener>
              </BoxTransition>
            )}
          </Popper>
          {/*  */}
          {/*  */}
          {/* @@screen */}
          <BlockUI isActive={isBlockui}>
            <Box>
              <strong>Interakcija je zaleđena... [{count}]</strong>
            </Box>
          </BlockUI>
          <BlockUI isActive={isDefault} />
          <BlockUI isActive={isNetw}>
            <section className="w-full h-full flex items-center justify-center">
              <Box width={128} height={128}>
                <ProgressRing
                  progress={p$}
                  duration={3789}
                  className="text-primary dark:text-white"
                  allowDecrease
                  bg="transparent"
                  width={4}
                />
              </Box>
            </section>
          </BlockUI>
        </>
      </section>
    </LayoutMain>
  );
};

export default PageBlockui;
